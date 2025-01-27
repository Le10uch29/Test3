import React from "react";
import Search from "../Search/Search";
import "./Header.css";
import UserInfo from "../UserInfo/UserInfo";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="Header__container">
      <Search onSearch={onSearch} />
      <UserInfo />
    </div>
  );
};

export default Header;
