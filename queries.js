DB_URI =
  "postgresql://postgres:V3rBgPFsHg6M1VMuQfGB@containers-us-west-115.railway.app:7473/railway";
DB_PASS = "V3rBgPFsHg6M1VMuQfGB";
DB_USER = "postgres";
DB_HOST = "containers-us-west-115.railway.app";
PORT = 7473;
DB = "railway";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB,
  password: DB_PASS,
  port: PORT,
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
