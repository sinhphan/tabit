import {
  PlayerAverageRes,
  PlayerDeleteRes,
  PlayerHistoryRes,
  PlayerHistoryScoreRes,
  PlayerRes,
  PlayerWithPaginationRes,
} from './index.res';

describe('PlayerWithPaginationRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerWithPaginationRes();
    instance.id = 1;
    instance.players = [{ id: 1, username: 'user', score: 100 }];
    instance.total = 1;

    expect(instance.id).toEqual(1);
    expect(instance.players).toEqual([{ id: 1, username: 'user', score: 100 }]);
    expect(instance.total).toEqual(1);
  });
});

describe('PlayerRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerRes();
    instance.id = 1;
    instance.username = 'user';
    instance.score = 100;
    instance.createdAt = '2021-01-01';
    instance.updatedAt = '2021-01-02';
    instance.deletedAt = '2021-01-03';

    expect(instance.id).toEqual(1);
    expect(instance.username).toEqual('user');
    expect(instance.score).toEqual(100);
    expect(instance.createdAt).toEqual('2021-01-01');
    expect(instance.updatedAt).toEqual('2021-01-02');
    expect(instance.deletedAt).toEqual('2021-01-03');
  });
});

describe('PlayerAverageRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerAverageRes();
    instance.username = 'user';
    instance.average = '50.0';

    expect(instance.username).toEqual('user');
    expect(instance.average).toEqual('50.0');
  });
});

describe('PlayerDeleteRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerDeleteRes();
    instance.message = 'Player deleted successfully';

    expect(instance.message).toEqual('Player deleted successfully');
  });
});

describe('PlayerHistoryRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerHistoryRes();
    instance.top = 100;
    instance.low = 50;
    instance.average = '75.0';
    instance.scores = [{ score: 80, createdAt: '2021-01-01' }];

    expect(instance.top).toEqual(100);
    expect(instance.low).toEqual(50);
    expect(instance.average).toEqual('75.0');
    expect(instance.scores).toEqual([{ score: 80, createdAt: '2021-01-01' }]);
  });
});

describe('PlayerHistoryScoreRes', () => {
  it('should create an instance with correct property values', () => {
    const instance = new PlayerHistoryScoreRes();
    instance.score = 100;
    instance.createdAt = '2021-01-01';

    expect(instance.score).toEqual(100);
    expect(instance.createdAt).toEqual('2021-01-01');
  });
});
