// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';
import { GroupMemberService } from '../group-member.service';
import { GroupService } from '../../../group/shared/group.service';

describe('GroupMemberService', () => {
  let groupMemberService: GroupMemberService;
  let groupService: GroupService;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    groupMemberService = module.get<GroupMemberService>(GroupMemberService);
    groupService = module.get<GroupService>(GroupService);
  });

  describe('findAll', () => {
    it('should return an array of group members', async () => {
      const findAllGroupMembers = await groupMemberService.findAll();
      expect(findAllGroupMembers).toBeDefined();
      expect(findAllGroupMembers).toEqual([]);
    });
  });

  describe('create', () => {
    it('should be able to create Group', async () => {
      await groupService.createFirstGroup();
      const createGroup = await groupMemberService.create({
        memberId: 1,
        groupId: 1,
        date: new Date(),
      });
      expect(createGroup).toBeDefined();
      expect(createGroup).toHaveProperty('groupId', 1);
    });
  });

  describe('findOneById', () => {
    it('should return single Group', async () => {
      const findOneGroup = await groupMemberService.findOneById(1);
      expect(findOneGroup).toBeDefined();
      expect(findOneGroup).toHaveProperty('id', 1);
      expect(findOneGroup).toHaveProperty('groupId', 1);
    });
  });

  describe('update', () => {
    it('should return an array of Group', async () => {
      const mockedGroupData: any = {
        id: 1,
        groupId: 1
      };
      const updateGroup = await groupMemberService.update(1, mockedGroupData);
      expect(updateGroup).toBeDefined();
      expect(updateGroup).toHaveProperty('groupId', 1);
    });
  });

  describe('delete', () => {
    it('should return an array of Group', async () => {
      const deletGroup = await groupMemberService.delete(1);
      expect(deletGroup).toBe(undefined);
    });
  });
});
