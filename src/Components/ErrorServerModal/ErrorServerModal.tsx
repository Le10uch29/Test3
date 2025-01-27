import React from "react";
import "./ErrorServerModal.css";

interface ErrorServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorServerModal: React.FC<ErrorServerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="ErrorServerModal__overlay">
      <div className="ErrorServerModal__container">
        <p className="ErrorServerModal__descr">Произошла ошибка на сервере</p>
        <button className="ErrorServerModal__btn-cancel" onClick={onClose}>
          Вернутся к списку
        </button>
      </div>
    </div>
  );
};

export default ErrorServerModal;
