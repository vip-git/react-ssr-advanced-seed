// dbConnection
import { dbConnection } from '../__mocks__/db-connection.mock';

// Shared
import { CatsService } from '../shared/cats.service';

describe('CatsController', () => {
  let catsService: CatsService;
  beforeEach(async () => {
    const module = await dbConnection.compile();
    catsService = module.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await catsService.findAll()).toBeDefined();
      expect(await catsService.findAll()).toEqual([]);
    });
  });
});
