const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.PORT,
});

const getTest = (request, response) => {
  pool.query("SELECT * FROM test ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTest = (request, response) => {
  const { name, price } = request.body;

  pool.query(
    "INSERT INTO test (name, price) VALUES ($1, $2) RETURNING *",
    [name, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

module.exports = {
  getTest,
  createTest,
};
