// Library
import {
	Injectable,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal
import { ChatModel } from './chat.model';

@Injectable()
export class ChatService {
	private readonly chats: ChatModel[] = [];

	constructor(
		@InjectRepository(ChatModel)
		private readonly chatRepository: Repository<ChatModel>
	) {}

	protected getId(paramId: any): number {
		const id = parseInt(paramId, 10);

		if (isNaN(id) || typeof id !== 'number') {
			throw new BadRequestException();
		}

		return id;
	}

	async create(chatPayload: ChatModel): Promise<ChatModel> {
		const chat = new ChatModel();
		chat.groupId = chatPayload.groupId;
		chat.message = chatPayload.message;
		chat.date = chatPayload.date;
		chat.ownerId = chatPayload.ownerId;

		return await this.chatRepository.save(chat);
	}

	async findAll(): Promise<ChatModel[]> {
		return await this.chatRepository.find({
			cache: true,
			order: { id: 'ASC' }
		});
	}

	async findOneById(id: number): Promise<ChatModel> {
		return await this.chatRepository.findOne(id, { cache: true });
	}

	async update(paramId: any, entity: ChatModel): Promise<ChatModel> {
		await this.chatRepository.update(paramId, entity);
		return await this.findOneById(paramId);
	}

	async delete(paramId: any): Promise<void> {
		const id = this.getId(paramId);

		try {
			await this.chatRepository.delete(id);
		} catch (err) {
			throw new NotFoundException();
		}
	}
}
