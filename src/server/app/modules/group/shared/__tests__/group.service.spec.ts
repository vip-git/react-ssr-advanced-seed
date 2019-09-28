// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';
import { GroupService } from '../group.service';

describe('GroupService', () => {
  let groupService: GroupService;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupService = module.get<GroupService>(GroupService);
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const findAllGroups = await groupService.findAll({});
      expect(findAllGroups).toBeDefined();
      expect(findAllGroups).toEqual([]);
    });
  });
});
