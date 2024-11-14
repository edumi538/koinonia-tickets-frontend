import * as z from "zod";

export const schemaSignup = z.object({
  name: z.string().min(1, { message: "Campo Obrigatório" }),
  email: z.string().min(1, { message: "Campo Obrigatório" }).email({
    message: "Email inválido",
  }),
  password: z
    .string()
    .min(8, { message: "A sua senha precisa ter pelo menos 8 caracteres" })
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "A sua senha precisa ter pelo menos uma letra maiúscula, uma letra minúscula e um número",
      }
    ),
});
export const schemaSignin = z.object({
  email: z.string().min(1, { message: "Campo Obrigatório" }).email({
    message: "Email inválido",
  }),
  password: z
    .string()
    .min(1, { message: "Campo Obrigatório" }),
});
