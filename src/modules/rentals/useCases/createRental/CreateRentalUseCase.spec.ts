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

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayJS();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("Should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1",
      user_id: "1",
      expected_return_date: new Date(2023, 2, 1),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental if user already have an open rental", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1",
        user_id: "1",
        expected_return_date: new Date(2023, 2, 1),
      });

      await createRentalUseCase.execute({
        car_id: "2",
        user_id: "1",
        expected_return_date: new Date(2023, 2, 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rental if car already have an open rental", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1",
        user_id: "1",
        expected_return_date: new Date(2023, 2, 1),
      });

      await createRentalUseCase.execute({
        car_id: "1",
        user_id: "2",
        expected_return_date: new Date(2023, 2, 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rental if expected return date is less than 24 hours", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1",
        user_id: "1",
        expected_return_date: dateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
