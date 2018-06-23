// Library
import { Injectable } from '@nestjs/common';
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
}
