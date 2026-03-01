import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@repo/stores";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LoaderCircle,
  loginSchema,
  MindEaseControlledInput,
  MindEaseLogo,
  toast,
  type LoginFormData,
} from "@repo/ui";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Login: React.FC = () => {
  const { login, isLoading } = useAuthStore();

  const loginMethods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = loginMethods;

  const handleLogin = async (data: LoginFormData) => {
    if (isLoading) return null;
    try {
      await login(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <MindEaseLogo />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bem-vindo de volta!</CardTitle>
              <CardDescription>
                Faça seu login para ter acesso a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...loginMethods}>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <Button variant="outline" className="w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Entrar com Google
                      </Button>
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-white px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <MindEaseControlledInput
                          control={control}
                          name="email"
                          placeholder="Digite seu email"
                          label="Email"
                        />

                        <MindEaseControlledInput
                          control={control}
                          name="password"
                          placeholder="Digite sua senha"
                          label="Senha"
                          type="password"
                        />
                        <Button
                          disabled={isLoading}
                          type="submit"
                          className="w-full"
                        >
                          {isLoading && (
                            <LoaderCircle className="animate-spin" />
                          )}
                          Entrar
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        Não possui conta?{" "}
                        <a
                          href="/register"
                          className="underline underline-offset-4"
                        >
                          Cadastre-se
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            Ao clicar em continuar, você concorda com nossos{" "}
            <a href="#">Termos de serviço</a> e{" "}
            <a href="#">Politicas de privacidade</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
