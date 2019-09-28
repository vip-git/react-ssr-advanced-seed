// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../__mocks__/db-connection.mock';
import { GroupMemberController } from './group-member.controller';

describe('GroupMember Controller', () => {
  let groupMemberController: GroupMemberController;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupMemberController = module.get<GroupMemberController>(GroupMemberController);
  });

  describe('findAll', () => {
    it('should return an array of group members', async () => {
      const allGroupMembers = await groupMemberController.findAll();
      expect(allGroupMembers).toBeDefined();
      expect(allGroupMembers).toEqual([]);
    });
  });
});
