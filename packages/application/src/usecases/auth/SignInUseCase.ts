import type { User } from "@repo/domain";
import { type IAuthRepository } from "../../ports";

export interface SignInRequest {
  email: string;
  password: string;
}

export class SignInUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: SignInRequest): Promise<User> {
    const { email, password } = request;

    if (!email || email.trim().length === 0) {
      throw new Error("Email é obrigatório");
    }

    if (!password || password.length < 6) {
      throw new Error("Senha deve ter no mínimo 6 caracteres");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    return await this.authRepository.signIn(email.trim(), password);
  }
}
