import { FC } from "react";
import { FormField } from "../FormField/FormField";
import { LoginButton } from "../LoginButton/LoginButton";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import "./RegisterForm.css";
import { registerUser } from "../../api/User";
import { useForm } from "react-hook-form";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: IRegisterForm) =>
        registerUser(data.username, data.email, data.password),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        reset();
      },
    },
    queryClient
  );

  const onSubmit = (data: IRegisterForm) => {
    registerMutation.mutate(data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          type="text"
          {...register("username", { required: "Введите имя" })}
        />
      </FormField>
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
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
        />
      </FormField>

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <LoginButton
        type="submit"
        title="Зарегистрироваться"
        isLoading={registerMutation.isPending}
      >
        Зарегистрироваться
      </LoginButton>
    </form>
  );
};
