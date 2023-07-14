import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './services/player.service';
import {
  PlayerAverageRes,
  PlayerDeleteRes,
  PlayerHistoryRes,
  PlayerRes,
  PlayerWithPaginationRes,
} from './res/index.res';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from 'src/entities';
import { PlayerEntity } from 'src/entities/player.entity';
import { CBadRequestException } from 'src/common/exception/bad-request.exception';
import { PlayerCreateDto } from './dto/index.dto';

class PlayerServiceMock {
  async getStudent(firstName: string, lastName: string) {
    return {
      name: 'Jane Doe',
      grades: [3.7, 3.8, 3.9, 4.0, 3.6],
    };
  }
}

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;
  let entity: PlayerEntity;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([PlayerEntity]), EntityModule],
      controllers: [PlayerController],
      providers: [
        PlayerService,
        {
          provide: PlayerService,
          useValue: {
            fetch: jest.fn().mockImplementation(() =>
              Promise.resolve({
                players: [
                  {
                    id: 1,
                    username: 'ducna',
                    score: 1,
                    createdAt: '2023-07-12T05:39:55.000Z',
                    updatedAt: '2023-07-12T05:39:55.000Z',
                    deletedAt: null,
                  },
                ],
                total: 1,
              }),
            ),
            average: jest.fn(),
            history: jest.fn(),
            store: jest.fn(),
            show: jest.fn(),
            destroy: jest.fn(),
            low: jest.fn(),
            top: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
    // entity = module.get<PlayerEntity>(PlayerEntity);
  });

  describe('fetch', () => {
    it('should get players', async () => {
      const expectedPlayers: PlayerWithPaginationRes = {
        players: [
          {
            id: 1,
            username: 'ducna',
            score: 1,
            createdAt: '2023-07-12T05:39:55.000Z',
            updatedAt: '2023-07-12T05:39:55.000Z',
            deletedAt: null,
          },
        ],
        total: 1,
      };
      const players = await controller.fetch({
        username: 'thanhna,ducna',
      });

      expect(players).toEqual(expectedPlayers);
    });
  });

  describe('fetchTop', () => {
    const req = { username: 'ducna' };

    it('should return the player with the highest score for the given username', async () => {
      const expectedPlayer: PlayerRes = {
        id: 1,
        username: 'ducna',
        score: 15,
      };

      jest.spyOn(service, 'top').mockResolvedValue(expectedPlayer);

      const result = await controller.fetchTop(req);

      expect(service.top).toHaveBeenCalledWith(req.username);
      expect(result).toEqual(expectedPlayer);
    });
  });

  describe('fetchLow', () => {
    const req = { username: 'ducna' };

    it('should return the player with the lowest score for the given username', async () => {
      const expectedPlayer: PlayerRes = {
        id: 1,
        username: 'ducna',
        score: 5,
      };

      jest.spyOn(service, 'low').mockResolvedValue(expectedPlayer);

      const result = await controller.fetchLow(req);

      expect(service.low).toHaveBeenCalledWith(req.username);
      expect(result).toEqual(expectedPlayer);
    });
  });

  describe('fetchAverage', () => {
    const req = { username: 'thanhna' };

    it('should return the average score for the given username', async () => {
      const expectedAverage: PlayerAverageRes = {
        average: '512.00',
        username: 'thanhna',
      };

      jest.spyOn(service, 'average').mockResolvedValue(expectedAverage);

      const result = await controller.fetchAverage(req);

      expect(service.average).toHaveBeenCalledWith(req.username);
      expect(result).toEqual(expectedAverage);
    });
  });

  describe('create', () => {
    const payload: PlayerCreateDto = {
      username: 'ducna',
      score: 10,
    };

    it('should create a new player and return the created player', async () => {
      const expectedPlayer: PlayerRes = {
        id: 1,
        username: 'ducna',
        score: 10,
      };

      jest.spyOn(service, 'store').mockResolvedValue(expectedPlayer);

      const result = await controller.create(payload);

      expect(service.store).toHaveBeenCalledWith(payload);
      expect(result).toEqual(expectedPlayer);
    });
  });

  describe('show', () => {
    const id = 1;

    it('should return the player with the given ID', async () => {
      const expectedPlayer: PlayerRes = {
        id: 1,
        username: 'ducna',
        score: 10,
      };

      jest.spyOn(service, 'show').mockResolvedValue(expectedPlayer);

      const result = await controller.show(id);

      expect(service.show).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedPlayer);
    });

    it('should throw CBadRequestException if the ID is invalid', async () => {
      const invalidId = 'abc';

      await expect(controller.show(invalidId as never)).rejects.toThrow(
        CBadRequestException,
      );
    });
  });

  describe('delete', () => {
    const id = 1;

    it('should delete the player with the given ID', async () => {
      const expectedResponse: PlayerDeleteRes = {
        message: `Deleted ${id} successfully!`,
      };

      jest.spyOn(service, 'destroy').mockResolvedValue(expectedResponse);

      const result = await controller.delete(id);

      expect(service.destroy).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw CBadRequestException if the ID is invalid', async () => {
      const invalidId = 'abc';

      await expect(controller.delete(invalidId as never)).rejects.toThrow(
        CBadRequestException,
      );
    });
  });

  describe('history', () => {
    const username = 'fuckyou';

    it('should return the player history for the given username', async () => {
      const expectedHistory: PlayerHistoryRes = {
        top: 100,
        low: 100,
        average: '100.00',
        scores: [
          {
            score: 100,
            createdAt: '2023-07-12T05:40:17.000Z',
          },
        ],
      };

      jest.spyOn(service, 'history').mockResolvedValue(expectedHistory);
      const result = await controller.history(username);
      expect(service.history).toHaveBeenCalledWith(username);
      expect(result).toEqual(expectedHistory);
    });

    it('should throw CBadRequestException if the username is invalid', async () => {
      const invalidUsername = '';

      await expect(controller.history(invalidUsername)).rejects.toThrow(
        CBadRequestException,
      );
    });
  });
});
