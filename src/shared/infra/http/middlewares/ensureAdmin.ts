import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const usersRepository = new UsersRepository();

  const { id } = request.user;
  const user = await usersRepository.findOneById(id);

  if (!user.admin) {
    throw new AppError("User don't have ADMIN permission");
  }

  next();
}
