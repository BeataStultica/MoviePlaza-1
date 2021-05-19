const { Pool } = require('pg');
//const db = process.env.NODE_ENV === 'test' ? 'movieplaza_test' : 'movieplaza';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

pool.connect();

module.exports = pool;
