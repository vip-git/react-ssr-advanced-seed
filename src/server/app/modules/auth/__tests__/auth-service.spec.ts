/**
* @jest-environment node
*/

// Scalar
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  it('should create a token', async () => {
    const accessTokenObj = await new AuthService().createToken('test', 'test');
    expect(accessTokenObj).toBeDefined();
    expect(accessTokenObj).toStrictEqual({ 
      'error': true, 
      'error_description': 'The code passed is incorrect or expired.', 
      'title': 'bad_verification_code' 
    });
  });
  it('should be able to validate user', async () => {
    const validateUserObj = await new AuthService().validateUser({
      email: 'test@test.com',
    });
    expect(validateUserObj).toBeDefined();
    expect(validateUserObj).toStrictEqual({});
  });
});
