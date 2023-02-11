import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    const { password } = request.body;
    const { token } = request.query;

    await resetPasswordUseCase.execute({ password, token: String(token) });
    return response.send();
  }
}

export { ResetPasswordController };
