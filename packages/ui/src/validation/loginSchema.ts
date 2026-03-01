import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha curta"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
