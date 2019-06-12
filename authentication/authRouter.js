const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/usersModel');
const secrets = require('../configSecrets/secret.js')


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: 'A problem occured with your registration'
        })
    })
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = makeToken(user)

            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid or nonexistent token'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = router;

