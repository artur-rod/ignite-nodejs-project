import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IDecode {
  email: string;
  sub: string;
}

interface IResponse {
  access_token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<IResponse> {
    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const userToken = await this.usersTokensRepository.findOneByToken(
      refresh_token
    );
    if (!userToken) {
      throw new AppError("Refresh Token not found");
    }

    const dateNow = this.dateProvider.dateNow();

    const tokenExpired = this.dateProvider.isAfter(
      dateNow,
      userToken.expires_date
    );
    if (tokenExpired) {
      await this.usersTokensRepository.delete(userToken.id);
      throw new AppError("Expired Refresh Token");
    }

    const { sub: user_id } = verify(
      refresh_token,
      secret_refresh_token
    ) as IDecode;

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const access_token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return { access_token, refresh_token };
  }
}

export { RefreshTokenUseCase };
