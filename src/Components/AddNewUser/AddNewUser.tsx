"use client";

import LogoutButton from "../LogoutButton/LogoutButton";
import SearchUser from "../Search/SearchUser";
import { User, AddProfile } from "../../api/interfaces";
import UserForm from "../UserForm/UserForm";
import "./AddNewUser.css";
import { useState } from "react";

interface AddNewUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: AddProfile) => void;
  users: User[];
}

const AddNewUser: React.FC<AddNewUserProps> = ({
  isOpen,
  onClose,
  onSubmit,
  users,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    birthDate: "",
    gender: "",
    role: "",
    avatar: "",
    email: "",
  });

  const handleSelectUser = (user: User | null) => {
    if (user) {
      setIsAddingNew(false);
      setSelectedUser(user);
      setUserDetails({
        firstName: user.name.firstName || "",
        lastName: user.name.lastName || "",
        middleName: user.name.middleName || "",
        birthDate: "",
        gender: "",
        role: "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  };

  const handleSubmit = () => {
    if (!isAddingNew && !selectedUser) {
      console.error("No selected user to edit.");
      return;
    }

    const newUser: AddProfile = {
      id: isAddingNew ? Date.now() : selectedUser!.id,
      name: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        middleName: userDetails.middleName,
      },
      email: userDetails.email,
      avatar: userDetails.avatar || "",
      birthDate: userDetails.birthDate || undefined,
      gender: userDetails.gender || undefined,
      role: userDetails.role || undefined,
    };

    onSubmit(newUser);

    setIsAddingNew(false);
    setSelectedUser(null);
    setUserDetails({
      firstName: "",
      lastName: "",
      middleName: "",
      birthDate: "",
      gender: "",
      role: "",
      avatar: "",
      email: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="AddNewUser__modalOverlay">
      <div className="AddNewUser__modal">
        <button className="AddNewUser__closeBtn" onClick={onClose}></button>
        <div className="AddNewUser__container">
          <LogoutButton onClose={onClose} />
          <h2 className="AddNewUser__title">Добавить нового пользователя</h2>
          <p className="AddNewUser__descr">Найти в списке</p>
        </div>
        <SearchUser onSelect={handleSelectUser} addedUsers={users || []} />
        <UserForm
          onSubmit={handleSubmit}
          initialUser={isAddingNew ? undefined : selectedUser || undefined}
          userDetails={userDetails}
          setUserDetails={(updatedDetails) =>
            setUserDetails((prev) => ({
              ...prev,
              ...updatedDetails,
            }))
          }
        />
      </div>
    </div>
  );
};

export default AddNewUser;
