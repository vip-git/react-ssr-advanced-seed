// Library
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rest
import { ChatsController } from './rest/chat.controller';

// Graphql
import { ChatResolvers } from './graphql/chat.resolvers';

// Shared
import { ChatService } from './shared/chat.service';
import { ChatModel } from './shared/chat.model';

@Module({
	imports: [TypeOrmModule.forFeature([ChatModel])],
	controllers: [ChatsController],
	providers: [ChatService, ChatResolvers]
})
export class ChatModule {}

// Extra exports
export * from './shared/chat.model';
export * from './shared/chat.service';
