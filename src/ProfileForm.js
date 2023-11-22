// ProfileForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = ({ user, onUpdateProfile }) => {
  console.log('onUpdateProfile:', onUpdateProfile);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);

  useEffect(() => {
    setNewFirstName(user.firstName);
    setNewLastName(user.lastName);
  }, [user]);

  const handleUpdateProfile = async () => {
    console.log('новые имя и фамилия', user )
    try {
      const updatedUserData = {
        ...user,
        firstName: newFirstName,
        lastName: newLastName,
      };
     
      const response = await axios.put("http://localhost:5001/api/updateProfile", updatedUserData);
    

      onUpdateProfile(updatedUserData);
      
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      console.log('Профиль успешно обновлен на сервере:', response.data);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error.message);
    }
  };

  return (
    <div>
      <h2>Профиль</h2>
      <div>
        <label>
          Имя:  
          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Фамилия:
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdateProfile}>Сохранить</button>
    </div>
  );
};

export default ProfileForm;
