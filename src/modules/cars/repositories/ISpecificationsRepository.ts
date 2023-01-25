import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecification): Promise<Specification>;
  findOneByName(name: string): Promise<Specification>;
  findManyByIds(ids: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecification };
