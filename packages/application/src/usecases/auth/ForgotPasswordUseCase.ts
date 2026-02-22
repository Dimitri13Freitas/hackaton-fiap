import { IAuthRepository } from "../../ports";

export interface ForgotPasswordRequest {
  email: string;
}

export class ForgotPasswordUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: ForgotPasswordRequest): Promise<void> {
    const { email } = request;

    if (!email || email.trim().length === 0) {
      throw new Error("Email é obrigatório");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    await this.authRepository.sendPasswordResetEmail(email.trim());
  }
}
