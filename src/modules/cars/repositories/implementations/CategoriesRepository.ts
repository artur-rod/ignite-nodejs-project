import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });
    await this.repository.save(category);
  }

  async findOneByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }
}

export { CategoriesRepository };
