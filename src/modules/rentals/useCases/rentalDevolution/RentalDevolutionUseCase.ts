import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RentalDevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findOneById(id);
    if (!rental) {
      throw new AppError("Rental not found");
    }

    const car = await this.carsRepository.findOneById(rental.car_id);

    const DATE_NOW = this.dateProvider.dateNow();
    const MINIMUM_DAILY = 1;

    let daily = this.dateProvider.compareInDays(rental.start_date, DATE_NOW);
    if (daily < MINIMUM_DAILY) {
      daily = 1;
    }

    let totalValue = 0;

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      DATE_NOW
    );
    if (delay > 0) {
      const fineAmount = delay * car.fine_amount;
      totalValue = fineAmount;
    }

    totalValue += daily * car.daily_rate;

    rental.end_date = DATE_NOW;
    rental.total = totalValue;
    const updateRental = await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return updateRental;
  }
}

export { RentalDevolutionUseCase };
