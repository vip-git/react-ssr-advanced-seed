// Library
import {
	Injectable,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Like, In, Any } from 'typeorm';

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

	async findAll(filters: any): Promise<ChatModel[]> {
		const params: any = {
			where: {},
			cache: filters.cache || true,
			order: { id: 'ASC' },
		};

		if (filters.where) {
			params.where = { ...filters.where };
		}

		if (filters.not) {
			_.map(filters.not, (val, key) => {
				params['where'][key] = Not(val)
			})
		}

		if (filters.like) {
			_.map(filters.like, (val, key) => {
				params['where'][key] = Like(val)
			})
		}

		if (filters.in) {
			_.map(filters.in, (val, key) => {
				params['where'][key] = In(val)
			})
		}

		if (filters.any) {
			_.map(filters.any, (val, key) => {
				params['where'][key] = Any(val)
			})
		}

		if (filters.order) {
			params.order = { ...filters.order };
		}

		if (filters.skip) {
			params.skip = filters.skip;
		}

		if (filters.take) {
			params.take = filters.take;
		}
		return await this.chatRepository.find(params);
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
