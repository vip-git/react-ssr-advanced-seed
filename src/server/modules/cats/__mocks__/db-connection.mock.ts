// Library
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// Auth
import { AuthModule } from '../../auth/auth.module';

// Rest
import { CatsController } from '../rest/cats.controller';

// Shared
import { CatModel } from '../shared/cat.model';
import { CatsService } from '../shared/cats.service';

export const dbConnection = Test.createTestingModule({
    imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.API_DB_HOST,
      port: parseInt(process.env.API_DB_PORT, 4),
      username: process.env.API_DB_USERNAME || 'postgres',
      password: process.env.API_DB_PASSWORD,
      database: process.env.API_DB_NAME || 'postgres',
      entities: [CatModel],
      synchronize: true,
    }), AuthModule, TypeOrmModule.forFeature([CatModel])],
    controllers: [CatsController],
    providers: [
      CatsService,
  ],
});
