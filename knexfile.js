require('dotenv').config({ path: 'variables.env' });

module.exports = {
  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
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