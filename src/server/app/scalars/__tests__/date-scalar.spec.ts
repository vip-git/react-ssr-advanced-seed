// Scalar
import { DateScalar } from '../date.scalar';

describe('DateScalar', () => {
  it('should return value of type date', async () => {
    const getTypeOfValueDate = new DateScalar().parseValue(1563020782 * 1000);
    expect(getTypeOfValueDate).toBeDefined();
    expect(getTypeOfValueDate.toString()).toEqual('Sat Jul 13 2019 14:26:22 GMT+0200 (Central European Summer Time)');
  });
  it('should be able to serialize date', async () => {
    const mockDate = new Date(1563020782 * 1000);
    const getTypeOfValueDate = new DateScalar().serialize(mockDate);
    expect(getTypeOfValueDate).toBeDefined();
    expect(getTypeOfValueDate).toBe(1563020782000);
  });
  it('should return value of type date', async () => {
    const mockDate = new Date(1563020782 * 1000);
    const mockAstValue = { kind: 'IntValue', value: 1563020782 * 1000 };
    const getTypeOfValueNull = new DateScalar().parseLiteral(mockDate);
    const getTypeOfValueDate = new DateScalar().parseLiteral(mockAstValue);
    expect(getTypeOfValueNull).toBeDefined();
    expect(getTypeOfValueNull).toEqual(null);
    expect(getTypeOfValueDate.toString()).toEqual('Sat Jul 13 2019 14:26:22 GMT+0200 (Central European Summer Time)');
  });
});
