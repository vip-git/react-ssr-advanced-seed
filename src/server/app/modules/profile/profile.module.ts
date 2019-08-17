import { Module } from '@nestjs/common';
import { ProfileService } from './shared/profile.service';
import { ProfileController } from './rest/profile.controller';
import { ProfileResolver } from './graphql/profile.resolver';

@Module({
  providers: [ProfileService, ProfileResolver],
  controllers: [ProfileController]
})
export class ProfileModule {}
