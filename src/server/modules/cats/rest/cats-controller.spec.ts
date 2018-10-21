// dbConnection
import { dbConnection } from '../__mocks__/db-connection.mock';

// Shared
import { CatsController } from '../rest/cats.controller';

describe('CatsController', () => {
  let catsController: CatsController;
  beforeEach(async () => {
    const module = await dbConnection.compile();

    catsController = module.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await catsController.findAll()).toBeDefined();
      expect(await catsController.findAll()).toEqual([]);
    });
  });
});
