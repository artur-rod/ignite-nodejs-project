import { inject, injectable } from "tsyringe";

import { IListCarsFilter } from "@modules/cars/DTOs/IListCarsFilterDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IListCarsFilter) {
    return this.carsRepository.listAvailable({ name, brand, category_id });
  }
}

export { ListAvailableCarsUseCase };
