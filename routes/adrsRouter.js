import {
  filterTransactionsForGivenAddress,
  getAddressInfo,
} from "../controllers/adrsController.js";
import express from "express";

const router = express.Router();

router.route("/transactions").get(filterTransactionsForGivenAddress);
// router.route("/info").get(getAddressInfo);
export default router;
