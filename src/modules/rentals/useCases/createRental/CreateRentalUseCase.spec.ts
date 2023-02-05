import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJS } from "@shared/container/providers/DateProvider/implementations/DayJS";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental Use Case", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalsRepository: RentalsRepositoryInMemory;
  let carsRepository: CarsRepositoryInMemory;
  let dateProvider: DayJS;

  let car: Car;
  let dayPlus24Hours: Date = new Date(Date.now() + 86400000);

  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayJS();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );

    car = await carsRepository.create({
      name: "Test Car",
      brand: "Test Brand",
      category_id: "123",
      description: "Test Description",
      daily_rate: 100,
      fine_amount: 100,
      license_plate: "ABC-123"
    })
  });

  it("Should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: dayPlus24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental if user already have an open rental", async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: dayPlus24Hours
    });

    await expect(createRentalUseCase.execute({
      car_id: "2",
      user_id: "1",
      expected_return_date: dayPlus24Hours
    })
    ).rejects.toEqual(new AppError("User already have an open rental"));
  });

  it("Should not be able to create a rental if car already have an open rental", async () => {
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1",
      expected_return_date: dayPlus24Hours
    });

    await expect(createRentalUseCase.execute({
      car_id: car.id,
      user_id: "2",
      expected_return_date: dayPlus24Hours
    })
    ).rejects.toEqual(new AppError("Car already have an open rental"));
  });

  it("Should not be able to create a rental if expected return date is less than 24 hours", async () => {
    await expect(createRentalUseCase.execute({
      car_id: "1",
      user_id: "1",
      expected_return_date: dateProvider.dateNow(),
    })
    ).rejects.toEqual(new AppError("Rental has to have a minimum time of 24 hours"));
  });
});
