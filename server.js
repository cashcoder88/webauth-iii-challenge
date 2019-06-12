const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const usersRouter = require('./users/usersRouter');

server.use(helmet());
server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.status(200).json('Server is ALIVE!')
});

server.use('/api/users', usersRouter)

module.exports = server;