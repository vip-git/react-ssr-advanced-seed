// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Internal
import { GroupService } from './shared/group.service';
import { GroupController } from './rest/group.controller';
import { GroupResolver } from './graphql/group.resolver';
import { GroupModel } from './shared/group.model';

@Module({
  imports: [TypeOrmModule.forFeature([GroupModel])],
  providers: [GroupService, GroupResolver],
  controllers: [GroupController]
})
export class GroupModule {}
