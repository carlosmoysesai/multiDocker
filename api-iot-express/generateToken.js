// generateToken.js
const jwt = require('jsonwebtoken');

const user = {
  id: 1,
  name: 'Test User'
};

const token = jwt.sign(user, 'your_jwt_secret');
console.log(token);
