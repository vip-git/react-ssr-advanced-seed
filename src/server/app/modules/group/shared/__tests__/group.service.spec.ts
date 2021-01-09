// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';
import { GroupType, AccessType } from '../group.model'; 
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
      const findAllGroups = await groupService.findAll({
        where: { 'groupName': '' },
        not: { 'groupName': '' },
        like: { 'groupName': '' },
        in: { 'groupName': [] },
        any: { 'groupName': [] },
        order: {},
        skip: 1,
        take: 1,
      });
      expect(findAllGroups).toBeDefined();
      expect(findAllGroups).toEqual([]);
    });
  });

  describe('create', () => {
    it('should be able to create first Group', async () => {
      const createGroup = await groupService.createFirstGroup();
      expect(createGroup).toBeDefined();
      expect(createGroup).toHaveProperty('groupType', 'group');
    });
    it('should be able to create Group', async () => {
      const createGroup = await groupService.create({
        ownerId: 6302771,
        memberId: 6302771,
        groupType: GroupType.Personal,
        groupImage: 'sadads',
        accessType: AccessType.Public,
        groupName: 'asdasdad',
        date: new Date(),
        groupMembers: [],
        chats: [],
        groupDescription: '123123',
      });
      expect(createGroup).toBeDefined();
      expect(createGroup).toHaveProperty('groupType', GroupType.Group);
    });
    it('should be able to create Group (group)', async () => {
      const createGroup = await groupService.create({
        ownerId: 6302771,
        memberId: 6302771,
        groupType: GroupType.Group,
        groupImage: 'sadads',
        accessType: AccessType.Public,
        groupName: 'asdasdad',
        date: new Date(),
        groupMembers: [],
        chats: [],
        groupDescription: '123123',
      });
      expect(createGroup).toBeDefined();
      expect(createGroup).toHaveProperty('groupType', GroupType.Group);
    });
  });

  describe('findOneById', () => {
    it('should return single Group', async () => {
      const findOneGroup = await groupService.findOneById(1);
      expect(findOneGroup).toBeDefined();
      expect(findOneGroup).toHaveProperty('id', 1);
      expect(findOneGroup).toHaveProperty('groupType', 'group');
    });
  });

  describe('update', () => {
    it('should return an array of Group', async () => {
      const mockedGroupData: any = {
        id: 1,
        groupName: 'My Group'
      };
      const updateGroup = await groupService.update(1, mockedGroupData);
      expect(updateGroup).toBeDefined();
      expect(updateGroup).toHaveProperty('groupName', 'My Group');
    });
  });

  describe('delete', () => {
    it('should return an array of Group', async () => {
      const deletGroup = await groupService.delete(1);
      expect(deletGroup).toBe(undefined);
    });
  });
});
