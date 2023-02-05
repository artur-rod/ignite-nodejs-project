import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create Car Specification Use Case", () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepository: CarsRepositoryInMemory;
  let specificationsRepository: SpecificationsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category123",
    });

    const specification = await specificationsRepository.create({
      name: "Specification Name",
      description: "Specification Description",
    });

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [`${specification.id}`],
    });

    expect(carWithSpecifications).toHaveProperty("specifications");
    expect(carWithSpecifications.specifications.length).toBe(1);
  });

  it("Should not be able to add a new specification to a non-existent car", async () => {
    await expect(createCarSpecificationUseCase.execute({
      car_id: "12345",
      specifications_id: ["54321"],
    })
    ).rejects.toEqual(new AppError("Car does not exists"));
  });
});
