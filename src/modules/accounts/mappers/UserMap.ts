import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../DTOs/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
