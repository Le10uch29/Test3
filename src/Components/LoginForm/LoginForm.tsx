import { FC } from "react";
import "./LoginForm.css";
import { FormField } from "../FormField/FormField";
import { LoginButton } from "../LoginButton/LoginButton";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { login } from "../../api/User";
import { useForm } from "react-hook-form";

interface ILoginForm {
  username: string;
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: ILoginForm) =>
        login(data.username, data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        reset();
      },
    },
    queryClient
  );

  const onSubmit = (data: ILoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          type="email"
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный формат email",
            },
          })}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов,",
            },
          })}
        />
      </FormField>

      {loginMutation.error && (
        <span className="login__error">Не правильный логин или пароль!</span>
      )}

      <LoginButton
        type="submit"
        title="Войти"
        isLoading={loginMutation.isPending}
      >
        Войти
      </LoginButton>
    </form>
  );
};
