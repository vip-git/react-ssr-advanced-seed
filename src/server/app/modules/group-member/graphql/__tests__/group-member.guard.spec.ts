import { GroupMemberGuard } from '../group-member.guard';

describe('GroupMemberGuard', () => {
  it('should be defined', () => {
    expect(new GroupMemberGuard()).toBeDefined();
  });
});
