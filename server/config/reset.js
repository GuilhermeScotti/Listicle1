import { pool } from "./database.js";
import "./dotenv.js";
import charsData from "../data/chars.js";

const createTableQuery = `
    DROP TABLE IF EXISTS chars;

    CREATE TABLE IF NOT EXISTS chars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        curiosity TEXT NOT NULL
    );
`;

const createCharsTable = async () => {
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 gifts table created successfully");
  } catch (error) {
    console.error("⚠️ error creating chars table", error);
  }
};

const seedCharsTable = async () => {
  await createCharsTable();

  charsData.forEach((char) => {
    const insertQuery = {
      text: "INSERT INTO chars (id, name, image, description, curiosity) VALUES ($1, $2, $3, $4, $5)",
    };

    const values = [
      char.id,
      char.name,
      char.image,
      char.description,
      char.curiosity,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting char", err);
        return;
      }

      console.log(`✅ ${char.name} added successfully`);
    });
  });
};

seedCharsTable();
