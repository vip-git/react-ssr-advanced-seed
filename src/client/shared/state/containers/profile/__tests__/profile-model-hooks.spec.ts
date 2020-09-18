/* eslint-disable import/no-extraneous-dependencies */
// Library
import { renderHook, act } from '@testing-library/react-hooks';
import useProfilePage from '../profile-model.hooks';

test('should increment counter', () => {
    const { result: { current: { profileActions }} } = renderHook(() => useProfilePage({}, {}))

    expect(profileActions).toBeDefined();
});
