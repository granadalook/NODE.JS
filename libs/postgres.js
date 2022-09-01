const { Client } = require("pg");
async function getconection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "stiven",
    password: "admin123",
    database: "postgres",
  });

  await client.connect();
  return client;
}

module.exports = getconection;
