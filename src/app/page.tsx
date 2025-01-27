"use client";
import React, { useState, useEffect } from "react";
import Header from "@/Components/Header/Header";
import "./page.module.css";
import TopHeader from "@/Components/TopHeader/TopHeader";
import UsersList from "@/Components/UsersList/UsersList";
import AddNewUser from "@/Components/AddNewUser/AddNewUser";
import { User } from "../api/interfaces";
import { USERS } from "../api/users";

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error(
        "Ошибка при загрузке пользователей из localStorage:",
        error
      );
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error(
        "Ошибка при сохранении пользователей в localStorage:",
        error
      );
    }
  }, [users]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter((user) =>
        user.name.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleOpenModal = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false); // Закрываем модальное окно
  };

  const handleEditUser = (index: number) => {
    setSelectedUser(users[index]);
    setModalOpen(true);
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleUserSubmit = (user: User | null) => {
    if (user) {
      if (selectedUser) {
        const updatedUsers = users.map((u) =>
          u.id === selectedUser.id ? user : u
        );
        setUsers(updatedUsers);
      } else {
        setUsers([...users, user]);
      }
    }
    setModalOpen(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <TopHeader onOpenModal={handleOpenModal} />
      <Header onSearch={handleSearch} />
      <UsersList
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      {isModalOpen && (
        <AddNewUser
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUserSubmit}
          users={USERS}
        />
      )}
    </>
  );
};

export default Home;
