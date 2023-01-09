import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateSpecificationUseCase);
    await createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
