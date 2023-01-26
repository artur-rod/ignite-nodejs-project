import { inject, injectable } from "tsyringe";

import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const userAlreadyHaveOpenRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (userAlreadyHaveOpenRental) {
      throw new AppError("User already have an open rental");
    }

    const carAlreadyHaveOpenRental =
      await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (carAlreadyHaveOpenRental) {
      throw new AppError("Car already have an open rental");
    }

    const dateNow = this.dateProvider.dateNow();
    const minimumRentalHours = 24;

    const checkExpectedReturnDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );
    if (checkExpectedReturnDate < minimumRentalHours) {
      throw new AppError("Rental has to have a minimum time of 24 hours");
    }

    return this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
  }
}

export { CreateRentalUseCase };
