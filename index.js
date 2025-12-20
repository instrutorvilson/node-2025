const express = require('express');
const app = express();
const port = 8080;

const rotaUsers = require('./api-users')


app.use(express.json())
app.use('/api/users', rotaUsers)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});