
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('sessions', table => {
      table.uuid('sid').primary().notNullable();
      table.text('sess', 'longtext').notNullable();
      table.timestamp('expired').notNullable();
      table.timestamps(true, true);
      table.index('sid', 'sessions_pkey');
      table.index('expired', 'sessions_expired_index');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('sessions')
  ])
};


/**
 "sessions_pkey" PRIMARY KEY, btree (sid)
 "sessions_expired_index" btree (expired)
 */