// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    database: 'training',
    user:     'root',
    password: 'k0thetinnoi'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations'
  }
};
