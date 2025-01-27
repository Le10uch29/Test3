import React from "react";
import "./DeleteModal.css";

interface DeleteModalProps {
  isOpen: boolean;
  user?: {
    name?: { firstName?: string; lastName?: string; middleName: string };
  };
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  user,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="DeleteModal__overlay">
      <div className="DeleteModal__container">
        <span className="DeleteModal__text">
          Вы хотите удалить пользователя:
        </span>
        <p className="DeleteModal__descr">
          {user?.name?.lastName} {user?.name?.firstName}{" "}
          {user?.name?.middleName}
        </p>
        <div className="DeleteModal__btn-group">
          <button className="DeleteModal__btn-delete" onClick={onSubmit}>
            Удалить
          </button>
          <button className="DeleteModal__btn-cancel" onClick={onClose}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
