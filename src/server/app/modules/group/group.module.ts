import { Module } from '@nestjs/common';
import { GroupService } from './shared/group.service';
import { GroupController } from './rest/group.controller';
import { GroupResolver } from './graphql/group.resolver';

@Module({
  providers: [GroupService, GroupResolver],
  controllers: [GroupController]
})
export class GroupModule {}
