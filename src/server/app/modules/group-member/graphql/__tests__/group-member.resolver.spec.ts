// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { GroupMemberResolver } from '../group-member.resolver';
import { GroupMemberService } from '../../shared/group-member.service';

describe('GroupMemberResolver', () => {
  let groupMemberResolver: GroupMemberResolver;
  let groupMemberService: GroupMemberService;

  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupMemberService = module.get<GroupMemberService>(GroupMemberService);
    groupMemberResolver = new GroupMemberResolver(groupMemberService);
  });

  describe('getGroupMember', () => {
    it('should return an array of group member', async () => {
      const getGroupMember = await groupMemberResolver.getGroupMember();
      expect(getGroupMember).toBeDefined();
      expect(getGroupMember).toEqual([]);
    });
  });
});
