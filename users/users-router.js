const router = require('express').Router();

const Users = require('./usersModel.js');
// const restricted = require('../authentication/restricted.js')

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200),json(users)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'Unable to access users via Catch', err
        })
    })
})