
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name', 100);
      table.string('username', 50).unique().index();
      table.string('password');
      table.timestamps(true, true);

  })
};

exports.down = function(knex) {
  
};
