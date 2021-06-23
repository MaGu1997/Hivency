const { Client } = require("pg");

/*

MODIFY ACCORDING TO YOUR LOCAL PGADMIN INFORMATION

host = localhost (default)
user = postgresql username
password = enter your password for localhost
database = postgres (default)
port = 5432 (default)
*/
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "postgres",
});

const query = `
 CREATE TABLE IF NOT EXISTS rockpaperscissors (
	id serial PRIMARY KEY,
	name TEXT NOT NULL,
	move TEXT  NOT NULL,
	name2 TEXT NOT NULL,
	move2 TEXT  NOT NULL,
	winner TEXT  NOT NULL,
	timestamp TEXT NOT NULL
  );
`;

client.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
});

module.exports = client;
