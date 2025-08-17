const { Pool } = require("pg");

const pool = new Pool({
    connectionString: 'postgresql://postgres:Siva%40123@localhost:5433/healthcare-system',
});

module.exports = pool;
