// Library
const request = require('supertest');
import { INestApplication } from '@nestjs/common';

// dbConnection
import { dbConnection } from './__mocks__/db-connection.mock';

// Shared
import { CatsService } from './shared/cats.service';

describe('Cats e2e test', () => {
  let app: INestApplication;
  const catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await dbConnection
                          .overrideProvider(CatsService)
                          .useValue(catsService)
                          .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
            .get('/cats')
            .expect(200)
            .expect(catsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
