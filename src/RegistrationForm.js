// RegistrationForm.js

import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Используйте null для представления отсутствия изображения
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.post("http://localhost:5001/api/register", formData);

      // Установим сообщение об успешной регистрации
      setRegistrationMessage("Профиль создан!");
    } catch (error) {
      console.error("Registration error:", error.message);

      // Установим сообщение об ошибке регистрации
      setRegistrationMessage("Произошла ошибка при регистрации");
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="Registr-block">
      <h1>Добро пожаловать в ViK</h1>
      <h2>Регистрация </h2>
      {registrationMessage && (
        <div
          style={{
            color: registrationMessage.includes("успешно") ? "green" : "red",
          }}
        >
          {registrationMessage}
        </div>
      )}
      <form className="Registr-block-form">
        {/* ... Остальные поля ... */}

        
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Имя пользователя: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Пароль:</div>
          <input
            type="password"
            class="Registr-block-form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Имя: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Фамилия: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>


        <label className="Registr-block-form-label">
          <div className="Registr-block-form_text"> Изображение профиля: </div>
          <input
            type="file"
            accept="image/*"
            className="Registr-block-form_input"
            onChange={handleProfilePictureChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </form>

      <div className="wave-container">
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default RegistrationForm;



/* import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegister = async () => {
    try {
        const response = await axios.post("http://localhost:5001/api/register", {
            username,
            password,
            firstName,
            lastName,
            profilePicture,
          });

      setRegistrationMessage("Профиль создан!");
    } catch (error) {
      console.error("Registration error:", error.message);

      setRegistrationMessage("Произошла ошибка при регистрации");
    }
  };

  return (
    <div class="Registr-block">
    <h1>Добро пожаловать в ViK</h1>
      <h2>Регистрация </h2>
      {registrationMessage && (
        <div
          style={{
            color: registrationMessage.includes("успешно") ? "green" : "red",
          }}
        >
          {registrationMessage}
        </div>
      )}
      <form class="Registr-block-form">
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Имя пользователя: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Пароль:</div>
          <input
            type="password"
            class="Registr-block-form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Имя: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Фамилия: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label class="Registr-block-form-label">
          <div class="Registr-block-form_text"> Изображение профиля: </div>
          <input
            type="text"
            class="Registr-block-form_input"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Зарегестрироваться
        </button>
      </form>

      <div className="wave-container">
        <div className="wave"></div>
      </div>
    </div>
  );
};

export default RegistrationForm;
 */ 