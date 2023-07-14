import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerEntity } from 'src/entities/player.entity';
import { Between, In, Repository } from 'typeorm';
import { PlayerService } from './player.service';
import { CBadRequestException } from 'src/common/exception/bad-request.exception';
import { PlayerCreateDto, PlayerDto } from '../dto/index.dto';
import { PlayerRes, PlayerWithPaginationRes } from '../res/index.res';
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const playerArray = [
  [
    {
      id: 1,
      username: 'ducna',
      score: 1,
      createdAt: '2023-07-12T05:39:55.000Z',
      updatedAt: '2023-07-12T05:39:55.000Z',
      deletedAt: null,
    },
  ],
  1,
];

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: MockType<Repository<PlayerEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(PlayerEntity),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            softDelete: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repository = module.get(getRepositoryToken(PlayerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    const req: PlayerDto = {
      username: 'thanhna,ducna',
      startAt: '2023-07-01',
      endAt: '2023-07-10',
      limit: 10,
      page: 1,
      isDesc: false,
    };

    it('should fetch players with the given criteria', async () => {
      const players = {
        players: [
          {
            id: 1,
            username: 'ducna',
            score: 1,
            createdAt: '2023-07-12T05:39:55.000Z',
            updatedAt: '2023-07-12T05:39:55.000Z',
            deletedAt: null,
          },
          {
            id: 4,
            username: 'thanhna',
            score: 101,
            createdAt: '2023-07-12T22:01:00.000Z',
            updatedAt: '2023-07-12T22:01:00.000Z',
            deletedAt: null,
          },
          {
            id: 5,
            username: 'thanhna',
            score: 103,
            createdAt: '2023-07-12T22:01:04.000Z',
            updatedAt: '2023-07-12T22:01:04.000Z',
            deletedAt: null,
          },
          {
            id: 6,
            username: 'thanhna',
            score: 1111,
            createdAt: '2023-07-12T22:01:08.000Z',
            updatedAt: '2023-07-12T22:01:08.000Z',
            deletedAt: null,
          },
          {
            id: 7,
            username: 'thanhna',
            score: 1112,
            createdAt: '2023-07-12T22:04:36.000Z',
            updatedAt: '2023-07-12T22:04:36.000Z',
            deletedAt: null,
          },
          {
            id: 8,
            username: 'thanhna',
            score: 133,
            createdAt: '2023-07-12T22:05:51.000Z',
            updatedAt: '2023-07-12T22:05:51.000Z',
            deletedAt: null,
          },
        ],
      };

      const total = 6;

      repository.findAndCount.mockResolvedValue([players, total] as never);

      const result = await service.fetch(req);

      expect(repository.findAndCount).toHaveBeenCalledWith({
        where: {
          username: In(['thanhna', 'ducna']),
          createdAt: Between(new Date('2023-07-01'), new Date('2023-07-10')),
        },
        order: { id: 'ASC' },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        players,
        total,
      });
    });
  });

  describe('store()', () => {
    const playerCreateDto: PlayerCreateDto = {
      username: 'ducna',
      score: 10,
    };

    it('should store a new player', async () => {
      const savedPlayer: PlayerEntity = {
        id: 1,
        username: 'ducna',
        score: 10,
      };

      repository.save.mockResolvedValue(savedPlayer as never);

      const result = await service.store(playerCreateDto);
      expect(repository.save).toHaveBeenCalledWith({
        ...playerCreateDto,
        username: playerCreateDto.username.toLowerCase(),
      });
      expect(result).toEqual(savedPlayer);
    });

    it('should throw CBadRequestException if username is invalid', () => {
      const invalidPlayerCreateDto: PlayerCreateDto = {
        score: 10,
      };

      expect(service.store(invalidPlayerCreateDto)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw CBadRequestException if score is invalid', () => {
      const invalidPlayerCreateDto: PlayerCreateDto = {
        username: 'ducna',
      };

      expect(service.store(invalidPlayerCreateDto)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw CBadRequestException if player creation fails', () => {
      repository.save.mockRejectedValue(new Error() as never);

      expect(service.store(playerCreateDto)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.save).toHaveBeenCalledWith({
        ...playerCreateDto,
        username: playerCreateDto.username.toLowerCase(),
      });
    });
  });

  describe('show', () => {
    const playerId = 1;

    it('should return the player with the given ID', async () => {
      const player: PlayerEntity = {
        id: playerId,
        username: 'ducna',
        score: 1,
      };

      repository.findOne.mockResolvedValue(player as never);

      const result = await service.show(playerId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: playerId },
      });
      expect(result).toEqual(player);
    });

    it('should throw CBadRequestException if player retrieval fails', async () => {
      repository.findOne.mockRejectedValue(new Error() as never);

      await expect(service.show(playerId)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: playerId },
      });
    });
  });

  describe('destroy', () => {
    const playerId = 1;

    it('should delete the player with the given ID', async () => {
      const player = {
        id: playerId,
        username: 'ducna',
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(player as never);
      repository.softDelete.mockResolvedValue(undefined as never);

      const result = await service.destroy(playerId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: playerId },
      });
      expect(repository.softDelete).toHaveBeenCalledWith(playerId);
      expect(result).toEqual({ message: `Deleted ${playerId} successfully!` });
    });

    it('should throw CBadRequestException if player is not found', async () => {
      repository.findOne.mockResolvedValue(undefined as never);

      await expect(service.destroy(playerId)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: playerId },
      });
      expect(repository.softDelete).not.toHaveBeenCalled();
    });

    it('should throw CBadRequestException if player deletion fails', async () => {
      const player = {
        id: playerId,
        username: 'ducna',
        score: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(player as never);
      repository.softDelete.mockRejectedValue(new Error() as never);

      await expect(service.destroy(playerId)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: playerId },
      });
      expect(repository.softDelete).toHaveBeenCalledWith(playerId);
    });
  });

  describe('average', () => {
    const username = 'ducna';

    it('should return the average score for the given username', async () => {
      const players = [
        {
          id: 1,
          username: 'ducna',
          score: 10,
        },
        {
          id: 2,
          username: 'ducna',
          score: 15,
        },
      ];

      repository.find.mockResolvedValue(players as never);

      const result = await service.average(username);

      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual({ average: '12.50', username });
    });

    it('should throw CBadRequestException if username is invalid', async () => {
      const invalidUsername = '';

      await expect(service.average(invalidUsername)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.find).not.toHaveBeenCalled();
    });
  });

  describe('top', () => {
    const username = 'ducna';

    it('should return the player with the highest score for the given username', async () => {
      const players = [
        {
          id: 1,
          username: 'ducna',
          score: 10,
          createdAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          username: 'ducna',
          score: 15,
          createdAt: new Date(),
          deletedAt: null,
        },
      ];

      repository.find.mockResolvedValue(players as never);

      const result = await service.top(username);

      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual({
        username: 'ducna',
        score: 15,
        createdAt: expect.any(Date),
      });
    });

    it('should return null if no players are found for the given username', () => {
      const players = [];
      const usernameNotFound = 'clgt';
      repository.find.mockResolvedValue(players as never);

      expect(service.top(usernameNotFound)).rejects.toThrow(
        CBadRequestException,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: { username: usernameNotFound },
      });
    });
  });

  describe('low', () => {
    const username = 'ducna';

    it('should return the player with the lowest score for the given username', async () => {
      const players = [
        {
          id: 1,
          username: 'ducna',
          score: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          username: 'ducna',
          score: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      repository.find.mockResolvedValue(players as never);

      const result = await service.low(username);

      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual({
        username: 'ducna',
        score: 5,
        createdAt: expect.any(Date),
      });
    });

    it('should return null if no players are found for the given username low', () => {
      const players = [];
      const usernameNotFound = 'faker-username';

      repository.find.mockResolvedValue(players as never);
      expect(service.low(usernameNotFound)).rejects.toThrow(
        CBadRequestException,
      );

      expect(repository.find).toHaveBeenCalledWith({
        where: { username: usernameNotFound },
      });
    });
  });

  describe('findPlayerByUsername', () => {
    const username = 'ducna';

    it('should return the players with the given username', async () => {
      const players = [
        {
          id: 1,
          username: 'ducna',
          score: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          username: 'ducna',
          score: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      repository.find.mockResolvedValue(players as never);

      const result = await service['findPlayerByUsername'](username);

      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual(players);
    });

    it('should throw CBadRequestException if username is invalid', async () => {
      const invalidUsername = '';

      await expect(
        service['findPlayerByUsername'](invalidUsername),
      ).rejects.toThrow(CBadRequestException);
      expect(repository.find).not.toHaveBeenCalled();
    });

    it('should throw CBadRequestException if no players are found for the given username', async () => {
      const players = [];

      repository.find.mockResolvedValue(players as never);

      await expect(service['findPlayerByUsername'](username)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
    });
  });

  describe('history', () => {
    const username = 'ducna';

    it('should return the player history for the given username', async () => {
      const players: PlayerEntity[] = [
        {
          id: 1,
          username: 'thanhna',
          score: 133,
          createdAt: '2023-07-13T04:14:25.000Z',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 2,
          username: 'thanhna',
          score: 1334,
          createdAt: '2023-07-13T04:14:29.000Z',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 3,
          username: 'thanhna',
          score: 333,
          createdAt: '2023-07-13T04:14:34.000Z',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 4,
          username: 'thanhna',
          score: 555,
          createdAt: '2023-07-13T04:14:38.000Z',
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 5,
          username: 'thanhna',
          score: 666,
          createdAt: '2023-07-13T04:14:43.000Z',
          updatedAt: null,
          deletedAt: null,
        },
      ];

      repository.find.mockResolvedValue(players as never);

      const result = await service.history(username);

      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
      expect(result).toEqual({
        top: 1334,
        low: 133,
        average: '604.20',
        scores: [
          {
            score: 133,
            createdAt: '2023-07-13T04:14:25.000Z',
          },
          {
            score: 1334,
            createdAt: '2023-07-13T04:14:29.000Z',
          },
          {
            score: 333,
            createdAt: '2023-07-13T04:14:34.000Z',
          },
          {
            score: 555,
            createdAt: '2023-07-13T04:14:38.000Z',
          },
          {
            score: 666,
            createdAt: '2023-07-13T04:14:43.000Z',
          },
        ],
      });
    });

    it('should throw CBadRequestException if no players are found for the given username', async () => {
      const players: PlayerEntity[] = [];

      repository.find.mockResolvedValue(players as never);

      await expect(service.history(username)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
    });

    it('should throw CBadRequestException if an error occurs during player retrieval', async () => {
      repository.find.mockRejectedValue(new Error() as never);

      await expect(service.history(username)).rejects.toThrow(
        CBadRequestException,
      );
      expect(repository.find).toHaveBeenCalledWith({
        where: { username },
      });
    });
  });
});
