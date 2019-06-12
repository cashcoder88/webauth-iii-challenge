const router = require('express').Router();

const Users = require('./usersModel.js');
// const restricted = require('../authentication/restricted.js')

router.get('/', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router;