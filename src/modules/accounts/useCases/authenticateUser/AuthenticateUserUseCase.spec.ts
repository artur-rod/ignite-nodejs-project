import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User Use Case", () => {
  let userRepositoryInMemory: UsersRepositoryInMemory;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
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

    expect(tryAuthentication).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "unexistent.user@email.com",
        password: "unexistentPassword",
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
