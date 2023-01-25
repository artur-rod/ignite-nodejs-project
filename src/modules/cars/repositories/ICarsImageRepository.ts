import { CarImage } from "../infra/typeorm/entities/carImage";

interface ICarsImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImageRepository };
