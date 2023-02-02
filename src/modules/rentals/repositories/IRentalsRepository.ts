import { ICreateRentalDTO } from "../DTOs/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOneById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
