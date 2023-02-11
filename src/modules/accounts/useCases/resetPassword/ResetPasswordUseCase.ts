import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepositor: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ password, token }: IRequest) {
    const userToken = await this.usersTokensRepositor.findOneByToken(token);
    if (!userToken) {
      throw new AppError("Invalid Token");
    }

    const dateNow = this.dateProvider.dateNow();

    const tokenExpired = this.dateProvider.isAfter(
      dateNow,
      userToken.expires_date
    );
    if (tokenExpired) {
      await this.usersTokensRepositor.delete(userToken.id);
      throw new AppError("Expired Token");
    }

    const user = await this.usersRepository.findOneById(userToken.user_id);
    if (!user) {
      await this.usersTokensRepositor.delete(userToken.id);
      throw new AppError("User not found");
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokensRepositor.delete(userToken.id);
  }
}

export { ResetPasswordUseCase };
