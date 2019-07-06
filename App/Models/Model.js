const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
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
    }
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = Model;
