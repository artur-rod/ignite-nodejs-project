import { Request, Response } from "express";
import { container } from "tsyringe";

import { RentalDevolutionUseCase } from "./RentalDevolutionUseCase";

class RentalDevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const rentalDevolutionUseCase = container.resolve(RentalDevolutionUseCase);

    const { id } = request.params;
    const rentalDevolution = await rentalDevolutionUseCase.execute(id);

    return response.json(rentalDevolution);
  }
}

export { RentalDevolutionController };
