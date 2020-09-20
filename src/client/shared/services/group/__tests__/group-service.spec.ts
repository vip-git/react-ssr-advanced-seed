// internal
import { createMockClient } from 'mock-apollo-client';
import { GroupServiceEngine } from '..';


// Mocks
const apolloClientMock = createMockClient();

describe('Group Service', () => {
    it('can get all groups (rest)', async () => {
        const allGroups = await GroupServiceEngine.requestAllGroupsRest({
            apolloClientMock,
            data: {}
        });
        expect((allGroups.subscribe() as any).data).toStrictEqual(undefined);
    });

    it('can get all groups', () => {
        const allGroups = GroupServiceEngine.requestAllGroups({
            apolloClientMock,
            data: {}
        });
        expect(allGroups).toStrictEqual({});
    });

    it('can create group', () => {
        const requestCreateGroup = GroupServiceEngine.createGroup({
            apolloClientMock,
            data: {}
        });
        expect(requestCreateGroup).toBeDefined();
    });

    it('can update group', () => {
        const requestEditGroup = GroupServiceEngine.updateGroup({
            apolloClientMock,
            data: {}
        });
        expect(requestEditGroup).toBeDefined();
    });

    it('can remove group', () => {
        const requestRemoveGroup = GroupServiceEngine.removeGroup({
            apolloClientMock,
            data: {}
        });
        expect(requestRemoveGroup).toBeDefined();
    });
});
