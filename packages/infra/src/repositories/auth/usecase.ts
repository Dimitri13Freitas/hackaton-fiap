import { AuthRepository } from "./AuthRepository";
import { SignOutUseCase, SignUpUseCase } from "@repo/application";

const authRepository = new AuthRepository();

export const signUpUseCase = new SignUpUseCase(authRepository);
export const signOutUseCase = new SignOutUseCase(authRepository);
