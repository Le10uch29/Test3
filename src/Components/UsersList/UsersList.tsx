"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./UsersList.css";
import { AddProfile } from "../../api/interfaces";
import change from "../../../public/change.svg";
import del from "../../../public/del.svg";
import DeleteModal from "../DeleteModal/DeleteModal";

interface UsersListProps {
  users: AddProfile[];
  onEditUser: (index: number) => void;
  onDeleteUser: (index: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Не указано";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Дата некорректна";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const openModal = (index: number) => {
    setSelectedUserIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedUserIndex !== null) {
      onDeleteUser(selectedUserIndex);
      closeModal();
    }
  };

  return (
    <>
      <ul className="UsersList__list">
        {users.map((user, index) => (
          <li className="UsersList__items" key={index}>
            <ul className="UsersList__list-info">
              <li className="UsersList__item">
                <Image
                  src={
                    user.avatar.startsWith("/") ? user.avatar : `/avatar.png`
                  }
                  alt="profile img"
                  width={44}
                  height={44}
                />
              </li>
              <li className="UsersList__item">
                {user.name?.lastName || ""} {user.name?.firstName || ""}{" "}
                {user.name?.middleName || ""}
              </li>
              <li className="UsersList__item">{user.email || "Не указано"}</li>
              <li className="UsersList__item">{formatDate(user.birthDate)}</li>
              <li className="UsersList__item">{user.gender || "Не указано"}</li>
              <li className="UsersList__item">{user.role || "Не указано"}</li>
              <li className="UsersList__item">
                <button
                  className="UsersList__edit"
                  onClick={() => onEditUser(index)}
                  aria-label="Редактировать пользователя"
                >
                  <Image src={change} alt="change" />
                </button>
                <button
                  className="UsersList__delete"
                  onClick={() => openModal(index)}
                  aria-label="Удалить пользователя"
                >
                  <Image src={del} alt="удалить пользователя" />
                </button>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <DeleteModal
        isOpen={isModalOpen}
        user={selectedUserIndex !== null ? users[selectedUserIndex] : undefined}
        onClose={closeModal}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default UsersList;
