import { User } from "@repo/domain";
import { IAuthRepository } from "../../ports";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export class SignUpUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: SignUpRequest): Promise<User> {
    const { email, password, name } = request;

    if (!name || name.trim().length === 0) {
      throw new Error("Nome é obrigatório");
    }

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

    return await this.authRepository.signUp(
      email.trim(),
      password,
      name.trim(),
    );
  }
}
