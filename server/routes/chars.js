import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import CharsController from "../controllers/chars.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/search", CharsController.searchChars);

router.get("/", CharsController.getChars);

router.get("/:charId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/char.html"));
});

export default router;
