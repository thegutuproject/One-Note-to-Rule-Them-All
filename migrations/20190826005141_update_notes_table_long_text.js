
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('notes', table => {
      table.text('body').notNullable().alter();
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('notes', table => {
      table.string('body').notNullable().alter();
    })
  ])
};
