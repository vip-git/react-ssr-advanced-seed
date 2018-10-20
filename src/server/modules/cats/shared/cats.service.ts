// Library
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal
import { CatModel } from './cat.model';

@Injectable()
export class CatsService {
  private readonly cats: CatModel[] = [];

  constructor(
    @InjectRepository(CatModel)
    private readonly catRepository: Repository<CatModel>,
  ) {}

  protected getId(paramId: any): number {
    const id = parseInt(paramId, 10);

    if (isNaN(id) || typeof id !== 'number') {
      throw new BadRequestException();
    }

    return id;
  }

  async create(catPayload: CatModel): Promise<CatModel>  {
    const cat = new CatModel();
    cat.age = catPayload.age;
    cat.name = catPayload.name;
    cat.breed = catPayload.breed;

    return await this.catRepository.save(cat);
  }

  findOne(id: number): CatModel {
    return this.cats[id];
  }

  async findAll(): Promise<CatModel[]> {
    return await this.catRepository.find({cache: true});
  }

  async findOneById(id: number): Promise<CatModel> {
    return await this.catRepository.findOne(id, {cache: true});
  }

  async update(paramId: any, entity: CatModel): Promise<CatModel> {
    const exists = await this.findOneById(paramId);

    return await this.catRepository.save(entity);
  }

  async delete(paramId: any): Promise<void> {
    const id = this.getId(paramId);

    try {
      await this.catRepository.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
