import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./modules/**/*.graphql'],
  path: join(process.cwd(), './graphql.schema.ts'),
  outputAs: 'class',
});
