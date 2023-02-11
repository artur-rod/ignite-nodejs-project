import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJS } from "@shared/container/providers/DateProvider/implementations/DayJS";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User Use Case", () => {
  let userRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayJS;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJS();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an existent user", async () => {
    const user: ICreateUserDTO = {
      name: "Name Lastname",
      email: "name.lastname@test.com",
      password: "12345",
      driver_license: "001122",
    };

    await createUserUseCase.execute(user);

    const tryAuthentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(tryAuthentication).toHaveProperty("access_token");
    expect(tryAuthentication).toHaveProperty("refresh_token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "inexistent.user@email.com",
        password: "inexistentPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an existent user with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Name Lastname",
        email: "name.lastname@test.com",
        password: "12345",
        driver_license: "001122",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
