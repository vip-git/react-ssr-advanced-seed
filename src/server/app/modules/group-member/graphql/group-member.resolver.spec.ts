import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberResolver } from './group-member.resolver';

describe('GroupMemberResolver', () => {
  let resolver: GroupMemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupMemberResolver],
    }).compile();

    resolver = module.get<GroupMemberResolver>(GroupMemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
