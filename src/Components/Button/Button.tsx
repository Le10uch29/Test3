import React from "react";
import Image from "next/image";
import add from "../../../public/add.svg";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <>
      <button className="Button__btn" onClick={onClick}>
        <Image
          src={add}
          alt="кнопка добавить нового пользователя"
          className="Button__add"
        />
        Добавить нового пользователя
      </button>
    </>
  );
};

export default Button;
