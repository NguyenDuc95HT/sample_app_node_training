const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

http.listen(3000, () => {
    console.log('Server run on port 3000...');
});

module.exports = app;
