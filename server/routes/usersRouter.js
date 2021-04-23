const express = require('express');
const usersService = require('../modules/usersService');

function createUsersRouter() {
  const usersRouter = express.Router();

  usersRouter.post('/register', (req, res) => {
    usersService.createUser({
      username: req.body.username,
      password: req.body.password
    })
      .then(_ => res.sendStatus(201))
      .catch(err => res.json(err));
  });

  usersRouter.post('/authenticate', (req, res) => {
    usersService.authenticateUser({
      username: req.body.username,
      password: req.body.password
    })
      .then(authResult => authResult.token
        ? res.status(200).json(authResult)
        : res.status(400).json({ message: authResult.message }))
      .catch(err => res.status(400).json(err))
  });

  return usersRouter;
}

module.exports = createUsersRouter;