// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../__mocks__/db-connection.mock';
import { ProfileController } from './profile.controller';

describe('Profile Controller', () => {
  let profileController: ProfileController;
  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    profileController = module.get<ProfileController>(ProfileController);
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      const allProfiles = await profileController.findAll();
      expect(allProfiles).toBeDefined();
      expect(allProfiles).toEqual([]);
    });
  });
});
