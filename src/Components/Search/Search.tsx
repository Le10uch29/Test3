"use client";
import React from "react";
import "./Search.css";
import Image from "next/image";
import searchIcon from "../../../public/searchIcon.svg";

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="Search__container">
      <input
        type="text"
        className="Search__input"
        placeholder="Поиск"
        onChange={handleInputChange}
      />
      <Image src={searchIcon} alt="поиск" className="Search__icon" />
    </div>
  );
};

export default Search;
