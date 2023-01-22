import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO) {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  async findOneById(id: string) {
    return this.repository.findOne(id);
  }
}

export { UsersRepository };
