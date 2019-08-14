
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('notes', table => {
      table.uuid('id').primary().notNullable();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.uuid('user_id').references('id').inTable('users').notNullable().onDelete('cascade');
      table.timestamps(true, true);
      table.engine('InnoDB');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('notes')
  ]);
};
