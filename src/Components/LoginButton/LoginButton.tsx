import { FC, HTMLAttributes } from "react";
import "./Button.css";

interface ILoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
}

export const LoginButton: FC<ILoginButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  kind = "primary",
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className="LoginButton"
      data-kind={kind}
      {...props}
    ></button>
  );
};
