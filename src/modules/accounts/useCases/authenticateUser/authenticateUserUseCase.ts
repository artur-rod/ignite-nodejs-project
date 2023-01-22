import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid email or password");
    }

    const token = sign({}, "69c6e4a394b794ac45a4ca63761bff01", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: { name: user.name, email },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
