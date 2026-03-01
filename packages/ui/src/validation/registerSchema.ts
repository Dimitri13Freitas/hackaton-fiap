import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "Campo obrigatório").email("E-mail inválido"),
  name: z
    .string()
    .min(1, "Campo obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres"),
  password: z.string().min(1, "Campo obrigatório").min(6, "Senha curta"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
