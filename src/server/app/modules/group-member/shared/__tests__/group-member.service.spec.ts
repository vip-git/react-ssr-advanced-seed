// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';
import { GroupMemberService } from '../group-member.service';

describe('GroupMemberService', () => {
  let groupMemberService: GroupMemberService;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupMemberService = module.get<GroupMemberService>(GroupMemberService);
  });

  describe('findAll', () => {
    it('should return an array of group members', async () => {
      const findAllGroupMembers = await groupMemberService.findAll();
      expect(findAllGroupMembers).toBeDefined();
      expect(findAllGroupMembers).toEqual([]);
    });
  });
});
