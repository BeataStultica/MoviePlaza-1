const { Pool } = require('pg');

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL ||
        'postgres://bshemyphktauco:97f8bea4d382c99b4749da4440914853debec42bdc83771aeaf13c1a7b1822a5@ec2-34-255-134-200.eu-west-1.compute.amazonaws.com:5432/dboqj906ps4mnl',
    ssl: { rejectUnauthorized: false },
});

pool.connect();

module.exports = pool;
