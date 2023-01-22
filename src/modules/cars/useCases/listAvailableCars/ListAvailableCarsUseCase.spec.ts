import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List Cars Use Case", () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepository: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("Should list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 1",
      category_id: "category_id",
    });

    const listAvailable = await listAvailableCarsUseCase.execute({});

    expect(listAvailable).toEqual([car]);
  });

  it("Should list available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 1",
      category_id: "category_id",
    });

    await carsRepository.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 2",
      category_id: "category_id",
    });

    const listAvailable = await listAvailableCarsUseCase.execute({
      name: car.name,
    });
    expect(listAvailable).toEqual([car]);
  });

  it("Should list available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 1",
      category_id: "category_id",
    });

    await carsRepository.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 2",
      category_id: "category_id",
    });

    const listAvailable = await listAvailableCarsUseCase.execute({
      brand: car.brand,
    });
    expect(listAvailable).toEqual([car]);
  });

  it("Should list available cars by category", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 1",
      category_id: "1234",
    });

    await carsRepository.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100.0,
      license_plate: "ABC-1234",
      fine_amount: 50.0,
      brand: "Brand 2",
      category_id: "5678",
    });

    const listAvailable = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });
    expect(listAvailable).toEqual([car]);
  });
});
