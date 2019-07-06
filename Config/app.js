const express = require('express');
require('dotenv').config();
const app = express();
const http = require('http').Server(app);

global.Env = process.env;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

http.listen(Env.PORT, () => {
    console.log(`Server run on port ${Env.PORT}`);
});

module.exports = app;
