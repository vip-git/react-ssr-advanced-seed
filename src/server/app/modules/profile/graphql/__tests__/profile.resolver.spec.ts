// dbConnection
import {
  dbConnection,
  dbClearConnection
} from '../../../../__mocks__/db-connection.mock';

// Shared
import { ProfileResolver } from '../profile.resolver';
import { ProfileService } from '../../shared/profile.service';

describe('ProfileResolver', () => {
  let profileResolver: ProfileResolver;
  let profileService: ProfileService;

  beforeAll(async () => {
    const clearConnection = await dbClearConnection.compile();
    clearConnection.close();
    const module = await dbConnection.compile();
    profileService = module.get<ProfileService>(ProfileService);
    profileResolver = new ProfileResolver(profileService);
  });

  describe('getProfile', () => {
    it('should return an array of profile', async () => {
      const getProfile = await profileResolver.getProfile({});
      expect(getProfile).toBeDefined();
      expect(getProfile).toEqual([]);
    });
  });
});
