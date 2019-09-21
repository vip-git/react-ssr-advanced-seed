// Library
import {
Injectable,
BadRequestException,
NotFoundException
} from '@nestjs/common';
import { map } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Like, In, Any } from 'typeorm';

// Internal
import { GroupModel } from './group.model';

@Injectable()
export class GroupService {
	private readonly group: GroupModel[] = [];

	constructor(
		@InjectRepository(GroupModel)
		private readonly groupRepository: Repository<GroupModel>
	) {}

	protected getId(paramId: any): number {
		const id = parseInt(paramId, 10);

		if (isNaN(id) || typeof id !== 'number') {
			throw new BadRequestException();
		}

		return id;
	}

	async create(groupPayload: GroupModel): Promise<GroupModel> {
		const group = new GroupModel();
		group.ownerId = groupPayload.ownerId;
		group.groupImage = groupPayload.groupImage;
		group.groupName = groupPayload.groupName;
		group.date = groupPayload.date;
		group.groupDescription = groupPayload.groupDescription;

		return await this.groupRepository.save(group);
	}

	async findAll(filters: any): Promise<GroupModel[]> {
		const params: any = {
			where: {},
			cache: filters.cache || true,
			order: { id: 'ASC' }
		};

		if (filters.where) {
			params.where = { ...filters.where };
		}

		if (filters.not) {
			map(filters.not, (val, key) => {
				params['where'][key] = Not(val);
			});
		}

		if (filters.like) {
			map(filters.like, (val, key) => {
				params['where'][key] = Like(val);
			});
		}

		if (filters.in) {
			map(filters.in, (val, key) => {
				params['where'][key] = In(val);
			});
		}

		if (filters.any) {
			map(filters.any, (val, key) => {
				params['where'][key] = Any(val);
			});
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
		return await this.groupRepository.find(params);
	}

	async findOneById(id: number): Promise<GroupModel> {
		return await this.groupRepository.findOne(id, { cache: true });
	}

	async update(paramId: any, entity: GroupModel): Promise<GroupModel> {
		await this.groupRepository.update(paramId, entity);
		return await this.findOneById(paramId);
	}

	async delete(paramId: any): Promise<void> {
		const id = this.getId(paramId);
		try {
			await this.groupRepository.delete(id);
		} catch (err) {
			throw new NotFoundException();
		}
	}
}