// Scalar
import { ExecutionContext } from '@nestjs/common';
import { CatsGuard } from '../cats.guard';

describe('CatsGuard', () => {
  it('should return true on activate ', async () => {
    const mockExecutionContext: ExecutionContext = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn(),
      switchToWs: jest.fn(),
    };
    const canActivate = new CatsGuard().canActivate(mockExecutionContext);
    expect(canActivate).toBeDefined();
    expect(canActivate).toEqual(true);
  });
});
