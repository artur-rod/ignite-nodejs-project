import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { IListCarsFilter } from "@modules/cars/DTOs/IListCarsFilterDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findOneByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAvailable({
    name,
    brand,
    category_id,
  }: IListCarsFilter): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.available === true && !name && !brand && !category_id) {
        return car;
      }
      if (
        car.available === true &&
        ((name && car.name.includes(name)) ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id))
      ) {
        return car;
      }
      return null;
    });
  }
}

export { CarsRepositoryInMemory };
