"use client";

import React from "react";
import "./LogoutButton.css";

interface LogoutButtonProps {
  onClose: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClose }) => {
  return (
    <button className="LogoutButton__button" onClick={onClose}>
      <span className="Line1"></span>
      <span className="Line2"></span>
    </button>
  );
};

export default LogoutButton;
