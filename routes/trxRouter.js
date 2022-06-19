import express from "express";
const router = express.Router();
import { fetchTransactions } from "../middleware/fetchTransactions.js";
import { createTransactions } from "../controllers/trxController.js";
router.route("/").post(fetchTransactions, createTransactions);

export default router;
