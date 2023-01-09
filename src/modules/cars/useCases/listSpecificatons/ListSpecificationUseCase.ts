import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
