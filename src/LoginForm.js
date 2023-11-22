import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });

      // Сохраняем информацию о сеансе, например, в состоянии приложения или cookie
      onLogin(response.data.user);

      // Устанавливаем флаг успешного входа
      setLoginSuccess(true);

      // Сбрасываем сообщение об ошибке
      setLoginMessage("");
    } catch (error) {
      console.error("Login error:", error.message);

      // Устанавливаем сообщение об ошибке входа
      setLoginMessage("Неверное имя пользователя или пароль");
    }
  };

  return (
    <div className="LoginForm">
      <h2>Вход</h2>
      {loginMessage && <div style={{ color: "red" }}>{loginMessage}</div>}
      {loginSuccess && <div style={{ color: "green" }}>Вход выполнен!</div>}
      <form>
        <label>
          Имя пользователя:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

