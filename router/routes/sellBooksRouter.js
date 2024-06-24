import express from "express";
import { sellBook } from "../controllers/sellBooksController.js";

const router = express.Router();

router.post("/books/sell", sellBook);

export default router;
