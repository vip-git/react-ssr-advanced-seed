// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rest
import { ProfileController } from './rest/profile.controller';

// Graphql
import { ProfileResolver } from './graphql/profile.resolver';

// Shared
import { ProfileService } from './shared/profile.service';
import { ProfileModel } from './shared/profile.model';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileModel])],
    controllers: [ProfileController],
    providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}

// Extra exports
export * from './shared/profile.model';
export * from './shared/profile.service';