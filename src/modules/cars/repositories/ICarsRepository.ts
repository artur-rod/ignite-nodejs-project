import { ICreateCarDTO } from "../DTOs/ICreateCarDTO";
import { IListCarsFilter } from "../DTOs/IListCarsFilterDTO";
import { Car } from "../infra/typeorm/entities/car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findOneByLicensePlate(license_plate: string): Promise<Car>;
  listAvailable(data: IListCarsFilter): Promise<Car[]>;
  findOneById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
