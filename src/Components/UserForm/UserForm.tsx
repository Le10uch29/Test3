"use client";

import { useState, useEffect } from "react";
import "./UserForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddProfile } from "../../api/interfaces";
import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
import Image from "next/image";
import SuccessModule from "../Header/SuccessModule/SuccessModule";

const UserForm: React.FC<{
  onSubmit: (user: AddProfile) => void;
  initialUser?: AddProfile;
  userDetails?: {
    birthDate: string;
    gender: string;
    role: string;
  };
  setUserDetails?: React.Dispatch<
    React.SetStateAction<{
      birthDate: string;
      gender: string;
      role: string;
    }>
  >;
}> = ({ onSubmit, initialUser, setUserDetails }) => {
  const [name, setName] = useState(
    initialUser
      ? `${initialUser.name.lastName} ${initialUser.name.firstName}`
      : ""
  );

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [email, setEmail] = useState(initialUser?.email || "");
  const [birthDate, setBirthDate] = useState<Date>(
    initialUser?.birthDate ? new Date(initialUser.birthDate) : new Date()
  );
  const [gender, setGender] = useState(initialUser?.gender || "Мужской");
  const [role, setRole] = useState(initialUser?.role || "Роль");
  const [avatar, setAvatar] = useState(initialUser?.avatar || "");

  const closeSuccessModule = () => {
    setIsSuccessOpen(false);
  };

  useEffect(() => {
    if (initialUser) {
      setName(`${initialUser.name.lastName} ${initialUser.name.firstName}`);
      setEmail(initialUser.email || "");
      setBirthDate(
        initialUser.birthDate ? new Date(initialUser.birthDate) : new Date()
      );
      setGender(initialUser.gender || "Мужской");
      setRole(initialUser.role || "Роль");
      setAvatar(initialUser.avatar || "");
    }
  }, [initialUser]);

  useEffect(() => {
    if (setUserDetails) {
      setUserDetails({
        birthDate: birthDate.toISOString(),
        gender,
        role,
      });
    }
  }, [birthDate, gender, role, setUserDetails]);

  useEffect(() => {
    if (gender === "Мужской") {
      setRole(role === "Медсестра/Медбрат" ? "Медбрат" : role);
    } else if (gender === "Женский") {
      setRole(role === "Медсестра/Медбрат" ? "Медсестра" : role);
    }
  }, [gender, role]);

  const validateForm = () => {
    if (
      !birthDate ||
      !(birthDate instanceof Date) ||
      isNaN(birthDate.getTime())
    ) {
      alert("Дата рождения должна быть корректной.");
      return false;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      alert("Возраст должен быть не менее 18 лет.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const [lastName = "", firstNameInitial = "", middleName = ""] =
      name.split(" ");

    onSubmit({
      id: initialUser?.id || Date.now(),
      name: {
        firstName: firstNameInitial?.replace(".", "") || "",
        lastName: lastName || "",
        middleName: middleName || "",
      },
      email,
      birthDate: birthDate.toISOString(),
      gender,
      role,
      avatar,
    });

    setIsSuccessOpen(true);

    setName("");
    setEmail("");
    setBirthDate(new Date());
    setGender("Мужской");
    setRole("Роль");
  };

  const onCancel = () => {
    setName("");
    setEmail("");
    setBirthDate(new Date());
    setGender("Мужской");
    setRole("Роль");
  };

  const roleOptions = (gender: string) => {
    if (gender === "Мужской") {
      return [
        { value: "Роль", disabled: true, text: "Роль" },
        { value: "Доктор", text: "Доктор" },
        { value: "Медбрат", text: "Медбрат" },
        { value: "Админ", text: "Админ" },
      ];
    } else if (gender === "Женский") {
      return [
        { value: "Роль", disabled: true, text: "Роль" },
        { value: "Доктор", text: "Доктор" },
        { value: "Медсестра", text: "Медсестра" },
        { value: "Админ", text: "Админ" },
      ];
    } else {
      return [
        { value: "Роль", disabled: true, text: "Роль" },
        { value: "Доктор", text: "Доктор" },
        { value: "Медсестра/Медбрат", text: "Медсестра/Медбрат" },
        { value: "Админ", text: "Админ" },
      ];
    }
  };

  return (
    <div className="UserForm__container">
      <form className="UserForm__form" onSubmit={handleSubmit}>
        <div className="UserForm__birth-date-cont">
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date!)}
            dateFormat="dd-MM-yyyy"
            required
            className="UserForm__date"
          />
        </div>

        <div className="UserForm__radio-cont">
          <div className="UserForm__radio">
            <input
              id="male"
              className="UserForm__radio-input"
              type="radio"
              value="Мужской"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Мужской"}
              required
            />
            <label htmlFor="male" className="UserForm__radio-label">
              Мужской
              <Image src={male} alt="Мужской" className="UserForm__radio-img" />
            </label>
            <input
              id="female"
              className="UserForm__radio-input"
              type="radio"
              value="Женский"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Женский"}
              required
            />
            <label htmlFor="female" className="UserForm__radio-label">
              Женский
              <Image
                src={female}
                alt="Женский"
                className="UserForm__radio-img"
              />
            </label>
          </div>
        </div>

        <div className="UserForm__select-cont">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {roleOptions(gender).map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.text}
              </option>
            ))}
          </select>
        </div>

        <div className="UserForm__btn-group">
          <button
            className="UserForm__btn-add"
            type="submit"
            onClick={handleSubmit}
          >
            Добавить
          </button>
          <button
            className="UserForm__btn-close"
            type="button"
            onClick={onCancel}
          >
            Отменить
          </button>
        </div>
      </form>
      <SuccessModule isOpen={isSuccessOpen} onClose={closeSuccessModule} />
    </div>
  );
};

export default UserForm;
