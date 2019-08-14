module.exports = {
  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host : '162.244.80.100',
      user : 'alexgutu_note-admin',
      password : 'LkTCi&DlXwTI',
      database : 'alexgutu_one-note-to-rule-them-all',
      charset : 'utf8mb4'
    },
    migrations: {

    },
    pool: {
      min: 2,
      max: 10
    },
    log: {
      warn(message) {
        console.log(message);
      },
      error(message) {
        console.log(message);
      },
      deprecate(message) {
        console.log(message);
      },
      debug(message) {
        console.log(message);
      },
    }
  },
};