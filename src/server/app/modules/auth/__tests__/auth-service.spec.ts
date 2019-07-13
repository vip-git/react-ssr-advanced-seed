// Scalar
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  it('should create a token', async () => {
    const accessTokenObj = await new AuthService().createToken();
    expect(accessTokenObj).toBeDefined();
    expect(accessTokenObj).toHaveProperty('accessToken');
    expect(accessTokenObj).toHaveProperty('expiresIn');
  });
  it('should be able to validate user', async () => {
    const validateUserObj = await new AuthService().validateUser({
      email: 'test@test.com',
    });
    expect(validateUserObj).toBeDefined();
    expect(validateUserObj).toStrictEqual({});
  });
});
