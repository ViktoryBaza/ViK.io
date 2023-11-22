console.log('Starting the server...');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model('User', {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  profilePicture: String,
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/api/register', async (req, res) => {
    console.log('Received login request'); 
  const { username, password, firstName, lastName, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Пользователь с таким именем уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      profilePicture,
    });

    res.json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.message.includes('duplicate key error')) {
      return res.status(400).json({ success: false, error: 'Пользователь с таким именем уже существует' });
    }

    res.status(500).json({ success: false, error: 'Произошла ошибка при регистрации' });
  }
}); 




app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ success: false, error: 'Неверное имя пользователя или пароль' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: 'Неверное имя пользователя или пароль' });
    }

    res.json({ success: true, user: existingUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Произошла ошибка при входе' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// server.js







/*
console.log('Starting the server...');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model('User', {
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  profilePicture: String,
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/api/register', async (req, res) => {
    console.log('Received login request'); 
  const { username, password, firstName, lastName, profilePicture } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Пользователь с таким именем уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      profilePicture,
    });

    res.json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);

    if (error.message.includes('duplicate key error')) {
      return res.status(400).json({ success: false, error: 'Пользователь с таким именем уже существует' });
    }

    res.status(500).json({ success: false, error: 'Произошла ошибка при регистрации' });
  }
}); */