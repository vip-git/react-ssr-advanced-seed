import { Module } from '@nestjs/common';
import { ProfileService } from './shared/profile.service';
import { ProfileController } from './rest/profile.controller';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
