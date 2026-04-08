const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "library",
  password: "1234",
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.error("Connection error", err));

module.exports = pool;