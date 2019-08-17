import { Module } from '@nestjs/common';
import { GroupService } from './shared/group.service';
import { GroupController } from './rest/group.controller';

@Module({
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
