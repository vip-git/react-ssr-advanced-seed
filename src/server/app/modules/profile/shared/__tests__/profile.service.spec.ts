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
    it('should return an array of groups', async () => {
      const findAllProfile = await profileService.findAll({});
      expect(findAllProfile).toBeDefined();
      expect(findAllProfile).toEqual([]);
    });
  });
});
