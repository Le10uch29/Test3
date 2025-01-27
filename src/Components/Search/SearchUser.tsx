import React, { useState } from "react";
import { User } from "../../api/interfaces";
import "./Search.css";

interface SearchUserProps {
  onSelect: (user: User | null) => void;
  addedUsers: User[];
}

const SearchUser: React.FC<SearchUserProps> = ({ onSelect, addedUsers }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const matchedUsers = addedUsers.filter((user) =>
      `${user.name.firstName} ${user.name.lastName} ${user.name.middleName}`
        .toLowerCase()
        .includes(term)
    );

    setFilteredUsers(matchedUsers);
  };

  const handleSelectUser = (user: User) => {
    setSearchTerm(
      `${user.name.firstName} ${user.name.lastName} ${user.name.middleName}`
    );
    setFilteredUsers([]);
    onSelect(user);
  };

  const handleAddNewUser = () => {
    setFilteredUsers([]);
    setSearchTerm("");
    onSelect(null);
  };

  return (
    <div className="SearchUser">
      <div className="SearchUser__inputContainer">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Найти пользователя"
          className="SearchUser__input"
        />
      </div>
      {filteredUsers.length > 0 && (
        <ul className="SearchUser__dropdown">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="SearchUser__dropdown-item"
            >
              {user.name.firstName} {user.name.lastName} {user.name.middleName}
            </li>
          ))}
          <li
            onClick={handleAddNewUser}
            className="SearchUser__dropdown-item SearchUser__addNew"
          >
            ➕ Добавить пользователя
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
