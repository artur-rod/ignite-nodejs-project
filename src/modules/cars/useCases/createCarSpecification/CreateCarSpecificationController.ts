import { Request, Response } from "express";
import { container } from "tsyringe";

import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const carsRepository = container.resolve(CarsRepository);
    const specificationsRepository = container.resolve(
      SpecificationsRepository
    );

    const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );

    const { id } = request.params;
    const { specifications_id } = request.body;

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(carWithSpecifications);
  }
}

export { CreateCarSpecificationController };
