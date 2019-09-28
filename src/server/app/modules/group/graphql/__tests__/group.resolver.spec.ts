// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { GroupResolver } from '../group.resolver';
import { GroupService } from '../../shared/group.service';

describe('GroupResolver', () => {
  let groupResolver: GroupResolver;
  let groupService: GroupService;

  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupService = module.get<GroupService>(GroupService);
    groupResolver = new GroupResolver(groupService);
  });

  describe('getGroups', () => {
    it('should return an array of groups', async () => {
      const getGroups = await groupResolver.getGroup({});
      expect(getGroups).toBeDefined();
      expect(getGroups).toEqual([]);
    });
  });
});
