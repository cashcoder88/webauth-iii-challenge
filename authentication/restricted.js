const jwt = require('jsonwebtoken');

const secrets = require('../configSecrets/secret')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;


    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            if (err) {
                res.status(500).json(err)
            } else {
                next();
            }
        })
    } else {
        res.status(400).json({
            message: 'You need a token to access the list of Users'
        })
    }
}