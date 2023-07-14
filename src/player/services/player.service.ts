import { Injectable } from '@nestjs/common';
import { Between, In, LessThan, MoreThan, Repository } from 'typeorm';
import { PlayerCreateDto, PlayerDto, PlayerUpdateDto } from '../dto/index.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PlayerAverageRes,
  PlayerDeleteRes,
  PlayerHistoryRes,
  PlayerRes,
  PlayerWithPaginationRes,
} from '../res/index.res';
import { PlayerEntity } from 'src/entities/player.entity';
import { CBadRequestException } from 'src/common/exception/bad-request.exception';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
  ) { }

  async fetch(req: PlayerDto): Promise<PlayerWithPaginationRes> {
    const usernames = req?.username.split(',');
    let createdAt = null;
    const limit = req?.limit ?? 10;
    const page = req?.page ?? 1;
    const isDesc = req?.isDesc ?? false;

    if (req?.startAt && !req?.endAt) {
      createdAt = MoreThan(new Date(req?.startAt));
    } else if (req?.endAt && !req?.startAt) {
      createdAt = LessThan(new Date(req?.endAt));
    } else if (!!req?.startAt && !!req?.endAt) {
      createdAt = Between(new Date(req?.startAt), new Date(req?.endAt));
    }
    const [players, total]: [PlayerEntity[], number] =
      await this.playerRepository.findAndCount({
        where: {
          username: In(usernames),
          createdAt,
        },
        order: { id: isDesc ? 'DESC' : 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      });
    return {
      players,
      total,
    };
  }

  async average(username: string): Promise<PlayerAverageRes> {
    const players = await this.findPlayerByUsername(username);
    const average = this.fetchAverage(players);
    return { average, username };
  }

  private fetchAverage(players) {
    return (
      players
        .map((player) => player?.score)
        .reduce((acc, cur) => acc + cur, 0) / players.length
    ).toFixed(2);
  }

  async top(username: string): Promise<PlayerRes> {
    const players = await this.findPlayerByUsername(username);
    return this.fetchTop(players);
  }

  private fetchTop(players) {
    let top = null;
    players.forEach((player) => {
      if (!top) {
        top = player;
      }
      if (player?.score > top?.score) {
        top = player;
      }
    });
    delete top?.id;
    delete top?.updatedAt;
    delete top?.deletedAt;
    return top;
  }

  async low(username: string): Promise<PlayerRes> {
    const players = await this.findPlayerByUsername(username);
    return this.fetchLow(players);
  }

  private fetchLow(players) {
    let low = null;
    players.forEach((player) => {
      if (!low) {
        low = player;
      }
      if (player?.score < low?.score) {
        low = player;
      }
    });
    delete low?.id;
    delete low?.updatedAt;
    delete low?.deletedAt;
    return low;
  }

  private async findPlayerByUsername(username: string) {
    if (!username)
      throw new CBadRequestException(`Username ${username} is invalid`);
    try {
      const players = await this.playerRepository.find({
        where: { username },
      });
      if (players.length === 0)
        throw new CBadRequestException(`Username ${username} don't have data`);
      return players;
    } catch (err) {
      throw new CBadRequestException('Find player by username failed');
    }
  }

  async store(player: PlayerCreateDto): Promise<PlayerRes> {
    const { username, score } = player;
    const numberRex = /^-?\d+$/;
    const numberInStringRex = /\d/;
    if (!player?.username || numberInStringRex.test(username)) throw new CBadRequestException('Username is invalid');
    if (!player?.score || !numberRex.test(`${score}`)) throw new CBadRequestException('Score is invalid');
    try {
      const data = await this.playerRepository.save({
        ...player,
        username: player?.username.toLocaleLowerCase(),
      });
      delete data?.updatedAt;
      return data;
    } catch (err) {
      throw new CBadRequestException('Create player failed');
    }
  }

  async show(id): Promise<PlayerRes> {
    try {
      return await this.playerRepository.findOne({ where: { id } });
    } catch (err) {
      throw new CBadRequestException(`Find player by ${id} failed`);
    }
  }

  async destroy(id): Promise<PlayerDeleteRes> {
    try {
      const player = await this.playerRepository.findOne({ where: { id } });
      if (!player?.id) {
        throw new CBadRequestException(`Player by ${id} not found!`);
      }
      await this.playerRepository.softDelete(id);
      return { message: `Deleted ${id} successfully!` };
    } catch (err) {
      throw new CBadRequestException(`Delete player by ${id} failed`);
    }
  }

  async history(username: string): Promise<PlayerHistoryRes> {
    try {
      const players: PlayerEntity[] = await this.playerRepository.find({
        where: { username },
      });
      if (players.length === 0) {
        throw new CBadRequestException(`Player by ${username} not found!`);
      }
      const top = this.fetchTop(players)?.score;
      const low = this.fetchLow(players)?.score;
      const average = this.fetchAverage(players);
      const scores = players.map(({ score, createdAt }) => ({
        score,
        createdAt,
      }));
      return { top, low, average, scores };
    } catch (err) {
      throw new CBadRequestException(`Fetch player ${username} failed!`);
    }
  }
}
