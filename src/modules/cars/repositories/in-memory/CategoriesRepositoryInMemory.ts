import { Category } from "../../entities/category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async findOneByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
}

export { CategoriesRepositoryInMemory };
