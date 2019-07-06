const app = require('./app');

const userRouter = require('../Routes/User');

const authRouter = require('../Routes/Auth');

const teamRouter = require('../Routes/Team')

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`, authRouter);

app.use(`${apiPrefix}/users`, userRouter);

app.use(`${apiPrefix}/teams`, teamRouter);
