const jwt = require('jsonwebtoken');

const createToken = (user, word, expiresIn) => {
  const { id, name, email, lastName } = user;

  return jwt.sign({ id, name, lastName, email }, word, { expiresIn });
};

const validateToken = (token, word) => {
  const userID = jwt.verify(token, word);

  return userID;
};

module.exports = { createToken, validateToken };
