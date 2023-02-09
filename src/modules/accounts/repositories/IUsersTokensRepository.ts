import { ICreateUserTokenDTO } from "../DTOs/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findOneByUserIdAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  delete(id: string): Promise<void>;
}

export { IUsersTokensRepository };
