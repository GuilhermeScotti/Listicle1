import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import charsData from "../data/chars.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(charsData);
});

router.get("/:charId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/char.html"));
});

export default router;
