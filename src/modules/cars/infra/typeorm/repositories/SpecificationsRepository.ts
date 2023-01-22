import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecification,
  // eslint-disable-next-line prettier/prettier
  ISpecificationsRepository
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecification): Promise<void> {
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);
  }

  async findOneByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }
}

export { SpecificationsRepository };
