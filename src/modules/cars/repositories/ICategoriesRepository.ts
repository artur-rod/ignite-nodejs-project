import { Category } from "../entities/category";

interface ICategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICategoryDTO): Promise<void>;
  findOneByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICategoryDTO };
