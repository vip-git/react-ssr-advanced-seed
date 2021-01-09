// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';
import { ProfileService } from '../profile.service';

describe('ProfileService', () => {
  let profileService: ProfileService;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    profileService = module.get<ProfileService>(ProfileService);
  });

  describe('findAll', () => {
    it('should return an array of Profiles', async () => {
      const findAllProfile = await profileService.findAll({
        where: { 'name': '' },
        not: { 'name': '' },
        like: { 'name': '' },
        order: {},
        skip: 1,
        take: 1,
      });
      expect(findAllProfile).toBeDefined();
      expect(findAllProfile).toEqual([]);
    });

    it('should return an array of Profiles (IN)', async () => {
      const findAllProfile = await profileService.findAll({
        where: { 'name': '' },
        in: { 'name': ['name'] },
        order: {},
        skip: 1,
        take: 1,
      });
      expect(findAllProfile).toBeDefined();
      expect(findAllProfile).toEqual([]);
    });

    it('should return an array of Profiles (ANY)', async () => {
      const findAllProfile = await profileService.findAll({
        where: { 'name': '' },
        any: { 'name': [] },
        order: {},
        skip: 1,
        take: 1,
      });
      expect(findAllProfile).toBeDefined();
      expect(findAllProfile).toEqual([]);
    });
  });


  describe('create', () => {
    it('should be able to create Profile', async () => {
      const createProfile = await profileService.create({
        githubUid: 123123,
        githubId: '123123',
        lastTokenWeb: '123123',
        lastTokenMobile: '123123',
        name: '123123',
        email: '123123',
        avatarUrl: '123123',
        bio: '123123',
        location: '123123',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const createProfile2 = await profileService.create({
        githubUid: 123123,
        githubId: '123123',
        lastTokenWeb: '123123',
        lastTokenMobile: '123123',
        name: '123123',
        email: '123123',
        avatarUrl: '123123',
        bio: '123123',
        location: '123123',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      expect(createProfile).toBeDefined();
      expect(createProfile).toHaveProperty('githubId', '123123');
      expect(createProfile2).toHaveProperty('id', 1);
    });
  });

  describe('findOneById', () => {
    it('should return single Profile', async () => {
      const findOneProfile = await profileService.findOneById(1);
      expect(findOneProfile).toBeDefined();
      expect(findOneProfile).toHaveProperty('id', 1);
      expect(findOneProfile).toHaveProperty('githubId', '123123');
    });
  });

  describe('update', () => {
    it('should return an array of Profile', async () => {
      const mockedProfileData: any = {
        id: 1,
        githubId: '123123'
      };
      const updateProfile = await profileService.update(1, mockedProfileData);
      expect(updateProfile).toBeDefined();
      expect(updateProfile).toHaveProperty('githubId', '123123');
    });
  });

  describe('update', () => {
    it('should return an array of Profile', async () => {
      const mockedProfileData: any = {
        id: 1,
        githubId: '123123'
      };
      const updateProfile = await profileService.updateToken(mockedProfileData.githubId, '123123', '1231233');
      const updateProfile2 = await profileService.updateToken(mockedProfileData.githubId, '12311231223', '1231233');
      expect(updateProfile2).toBe(false);
      expect(updateProfile).toBe(true);
    });
  });

  describe('delete', () => {
    it('should return an array of Profile', async () => {
      const deletProfile = await profileService.delete(1);
      expect(deletProfile).toBe(undefined);
    });
  });
});
