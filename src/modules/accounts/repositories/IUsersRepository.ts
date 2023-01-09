import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: string): Promise<User>;
}

export { IUsersRepository };
