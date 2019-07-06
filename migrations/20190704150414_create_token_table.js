
exports.up = function(knex) {
    return knex.schema.createTable('tokens', (table) => {
        table.increments();
        table.integer('user_id');
        table.string('token');
        table.string('status');
        table.timestamps(true, true);
  
    })
};

exports.down = function(knex) {
  
};
