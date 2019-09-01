import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberController } from './group-member.controller';

describe('GroupMember Controller', () => {
  let controller: GroupMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMemberController],
    }).compile();

    controller = module.get<GroupMemberController>(GroupMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
