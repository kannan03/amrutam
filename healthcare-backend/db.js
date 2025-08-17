const { Pool } = require("pg");

const pool = new Pool({
    connectionString: 'postgresql://postgres:Siva%40123@localhost:5433/healthcare-system', // replace your DB connection
});

module.exports = pool;
