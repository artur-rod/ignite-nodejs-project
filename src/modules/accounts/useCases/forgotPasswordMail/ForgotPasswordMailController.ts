import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPasswordMailUseCase } from "./ForgotPasswordMailUseCase";

class ForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const forgotPasswordMailUseCase = container.resolve(
      ForgotPasswordMailUseCase
    );

    const { email } = request.body;
    await forgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { ForgotPasswordMailController };
