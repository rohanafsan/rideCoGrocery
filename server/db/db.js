// Pool connection to the database
const { Pool } = require("pg");
const pool = new Pool({
  host: "database-1.ch8uk78bo0nj.ca-central-1.rds.amazonaws.com",
  port: 5432,
  user: "ridecogrocery",
  password: "password",
  database: "ridecodb",
});

module.exports = pool;
