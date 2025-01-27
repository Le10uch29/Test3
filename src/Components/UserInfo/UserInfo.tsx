import React from "react";
import "./UserInfo.css";

const UserInfo: React.FC = () => {
  return (
    <ul className="UserInfo__list">
      <li className="UserInfo__item">
        ФИО пользователя<span> По алфавиту А-Я</span>
      </li>
      <li className="UserInfo__item">Контактные данные</li>
      <li className="UserInfo__item">Дата рождения</li>
      <li className="UserInfo__item">Пол</li>
      <li className="UserInfo__item">Роль</li>
      <li className="UserInfo__item">action</li>
    </ul>
  );
};

export default UserInfo;
