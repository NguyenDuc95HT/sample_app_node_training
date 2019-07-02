const app = require('./app');

const userRouter = require('../Routes/User');

const authRouter = require('../Routes/Auth');

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`, authRouter);

app.use(`${apiPrefix}/users`, userRouter);