import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <div>
          <RegistrationForm onRegister={() => console.log('Registration successful')} />
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <p>Вход выполнен!</p>
          <ProfileForm user={user} onLogout={handleLogout} />
          {/* Другие компоненты для авторизованных пользователей */}
        </div>
      )}
    </div>
  );
};

export default App;



/* import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleUpdateProfile = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/profile">
            <ProfileForm user={user} onUpdateProfile={handleUpdateProfile} />
          </Route>
          <Route path="/">
            {!user ? (
              <div>
                <RegistrationForm onRegister={() => console.log('Registration successful')} />
                <LoginForm onLogin={handleLogin} />
              </div>
            ) : (
              <div>
                <p>Вход выполнен!</p>
                <ProfileForm user={user} onUpdateProfile={handleUpdateProfile} />
             </div>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
 */