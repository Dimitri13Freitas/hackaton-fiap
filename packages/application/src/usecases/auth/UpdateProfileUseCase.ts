import { IAuthRepository } from "../../ports";
import { User } from "@repo/domain";

export class UpdateProfileUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(name: string): Promise<User> {
    if (!name || name.trim() === "") {
      throw new Error("O nome não pode estar vazio");
    }

    return await this.authRepository.updateProfile(name);
  }
}
