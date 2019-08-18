// Library
import {
Injectable,
BadRequestException,
NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        group.groupName = groupPayload.groupName;
        group.date = groupPayload.date;
        group.groupDescription = groupPayload.groupDescription;

        return await this.groupRepository.save(group);
    }

    async findAll(): Promise<GroupModel[]> {
        return await this.groupRepository.find({
            cache: true,
            order: { id: 'ASC' }
        });
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