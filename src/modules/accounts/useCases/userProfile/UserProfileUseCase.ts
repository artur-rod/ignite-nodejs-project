import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/DTOs/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findOneById(user_id);
    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
