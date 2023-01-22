import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create Car Use Case", () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should create a new Car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category123",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with an existent license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car Name",
        description: "Car Description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category123",
      });

      await createCarUseCase.execute({
        name: "Car Name 2",
        description: "Car Description 2",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Car Brand",
        category_id: "category123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category123",
    });

    expect(car.available).toBe(true);
  });
});
