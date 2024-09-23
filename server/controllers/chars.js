import { pool } from "../config/database.js";

const getChars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM chars ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(409).json({ error: error.message });
  }
};

const searchChars = async (req, res) => {
  const { column, value } = req.query; // e.g., column=name&value=Mario
  const allowedColumns = ["name", "description", "curiosity", "id"];

  if (!allowedColumns.includes(column)) {
    return res.status(400).send("Invalid column name");
  }

  try {
    let query;
    let params;

    if (column === "id") {
      query = "SELECT * FROM chars WHERE id = $1";
      params = [parseInt(value, 10)];
    } else {
      query = `SELECT * FROM chars WHERE ${column} ILIKE $1 LIMIT 5`;
      params = [`%${value}%`];
    }

    const results = await pool.query(query, params);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getChars,
  searchChars,
};
