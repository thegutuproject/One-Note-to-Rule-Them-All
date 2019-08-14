
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.uuid('id').primary();
      table.string('email', 100).notNullable();
      table.unique(['email']);
      table.string('password').notNullable();
      table.timestamps(true, true);
      table.engine('InnoDB');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ]);
};
