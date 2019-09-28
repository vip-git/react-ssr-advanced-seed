// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../__mocks__/db-connection.mock';
import { GroupController } from './group.controller';

describe('Group Controller', () => {
  let groupController: GroupController;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupController = module.get<GroupController>(GroupController);
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const allGroups = await groupController.findAll();
      expect(allGroups).toBeDefined();
      expect(allGroups).toEqual([]);
    });
  });
});
