import React from "react";
import "./SuccessModule.css";

interface SuccessModuleProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModule: React.FC<SuccessModuleProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="SuccessModule__overlay">
      <div className="SuccessModule__container">
        <p className="SuccessModule__descr">Данные успешно сохранены</p>
        <button className="SuccessModule__btn-cancel" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default SuccessModule;
