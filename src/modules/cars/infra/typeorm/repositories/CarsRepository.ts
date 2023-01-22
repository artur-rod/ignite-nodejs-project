import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { IListCarsFilter } from "@modules/cars/DTOs/IListCarsFilterDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return this.repository.save(car);
  }
  async findOneByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async listAvailable({
    name,
    brand,
    category_id,
  }: IListCarsFilter): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("available = true");

    if (name) {
      carsQuery.andWhere(`name ILIKE '%${name}%'`);
    }
    if (brand) {
      carsQuery.andWhere(`brand ILIKE '%${brand}%'`);
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    return carsQuery.getMany();
  }
}

export { CarsRepository };
