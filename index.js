require('dotenv').config()
const express = require('express');
const app = express();
const port = 8080;

const rotaUsers = require('./api-users')
const rotaAuth = require('./auth')


app.use(express.json())
app.use('/api/users', rotaUsers)
app.use('/api/auth', rotaAuth)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});