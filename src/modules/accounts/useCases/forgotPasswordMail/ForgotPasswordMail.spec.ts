import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJS } from "@shared/container/providers/DateProvider/implementations/DayJS";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { ForgotPasswordMailUseCase } from "./ForgotPasswordMailUseCase";

describe("Forgot Mail Password Use Case", () => {
  let usersRepository: UsersRepositoryInMemory;
  let usersTokensRepository: UsersTokensRepositoryInMemory;
  let dateProvider: DayJS;
  let mailProvider: MailProviderInMemory;
  let forgotMailPasswordUseCase: ForgotPasswordMailUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJS();
    mailProvider = new MailProviderInMemory();

    forgotMailPasswordUseCase = new ForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot email to a user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    const createToken = jest.spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      name: "Gregory Dixon",
      email: "go@fuheti.bz",
      password: "12345",
      driver_license: "567275415",
    });

    await forgotMailPasswordUseCase.execute("go@fuheti.bz");

    expect(sendMail).toHaveBeenCalled();
    expect(createToken).toHaveBeenCalled();
  });

  it("should not be able to send a forgot email to a inexistent user", async () => {
    await expect(
      forgotMailPasswordUseCase.execute("ki@loga.sv")
    ).rejects.toEqual(new AppError("User does not exists"));
  });
});
