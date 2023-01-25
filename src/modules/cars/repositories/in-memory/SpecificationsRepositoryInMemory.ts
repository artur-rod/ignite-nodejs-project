import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

import {
  ICreateSpecification,
  ISpecificationsRepository
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);

    return specification;
  }

  async findOneByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findManyByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}

export { SpecificationsRepositoryInMemory };
