import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberService } from './group-member.service';

describe('GroupMemberService', () => {
  let service: GroupMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupMemberService],
    }).compile();

    service = module.get<GroupMemberService>(GroupMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
