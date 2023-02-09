import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token =
      request.body.refresh_token ||
      request.headers["x-refresh-token"] ||
      request.query.token;

    const tokens = await refreshTokenUseCase.execute(refresh_token);

    return response.json(tokens);
  }
}

export { RefreshTokenController };
