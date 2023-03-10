import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category Use Case", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute(category);

    const verifyCategoryCreation =
      await categoriesRepositoryInMemory.findOneByName(category.name);

    expect(verifyCategoryCreation).toHaveProperty("id");
    expect(verifyCategoryCreation).toHaveProperty("name", category.name);
    expect(verifyCategoryCreation).toHaveProperty(
      "description",
      category.description
    );
  });

  it("Should not be able to create a new category with existent name", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});
