"use client";

import React from "react";
import Button from "../Button/Button";
import "./TopHeader.css";

interface TopHeaderProps {
  onOpenModal: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onOpenModal }) => {
  return (
    <>
      <div className="TopHeader__container">
        <p className="TopHeader__descr">
          Пользователи клиники<span></span>
        </p>
        <Button onClick={onOpenModal} />
      </div>
    </>
  );
};

export default TopHeader;
