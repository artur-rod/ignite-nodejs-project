import { inject, injectable } from "tsyringe";

import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: CarsImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImageRepository.create(car_id, image_name);
    });
  }
}

export { UploadCarImagesUseCase };
