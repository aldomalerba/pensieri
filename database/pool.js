const Pool  = require('pg').Pool;

const databaseConfig = { connectionString: 'postgres://postgres:admin@localhost:5432/postgres' };
const pool = new Pool(databaseConfig);

module.exports = pool;