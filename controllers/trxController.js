import {
  paginateThroughTransactions,
  createTransaction,
  getTransactionById,
} from "../models/trxModel.js";
import {
  createAnAddress,
  getAddressByID,
  updateAddress,
} from "../models/adrsModel.js";
import removeBadTokens from "../utils/removeBadTokens.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createTransactions = async (req, res, next) => {
  let transactionCounter = 0;
  let transactionIds = [];
  let setOfTokens = new Set();
  try {
    const results = req.results;
    for await (const result of results) {
      const transactionId = result.hash;
      const findEntry = await getTransactionById(transactionId);

      // console.log("Entry " + result.hash + (findEntry ? " YES" : " NO"));
      //if it is some troll token, skip
      let token = result.tokenSymbol.trim();
      if (removeBadTokens(token)) setOfTokens.add(token);
      else continue;
      if (!findEntry) {
        const transactionEntry = await createTransaction(result);
        if (!transactionEntry) {
          throw new BadRequestError(`Failed to create transaction: ${hash}`);
        }
        transactionCounter++;
        transactionIds.push(transactionId.trim());
      } else {
        transactionCounter++;
        transactionIds.push(transactionId.trim());
        continue;
      }
    }
    let setOfTokensArray = Array.from(setOfTokens);
    const findAddress = await getAddressByID(req.body.address);
    if (!findAddress) {
      const addressEntry = await createAnAddress(
        req.body.address,
        transactionIds,
        setOfTokensArray
      );
      if (!addressEntry) {
        throw new BadRequestError(
          `Failed to create transaction: ${req.body.address}`
        );
      }
    } else {
      const updatedAddress = await updateAddress(
        req.body.address,
        transactionIds,
        setOfTokensArray
      );
      if (!updatedAddress) {
        throw new BadRequestError(
          `Failed to create Address:${req.body.address}`
        );
      }
    }

    console.log("Successfully imported data to database");
    res.status(StatusCodes.OK).json({
      msg: `Success! We found:${transactionCounter} new transactions!`,
      tokens: setOfTokensArray,
    });
  } catch (error) {
    next(error);
  }
};

export { createTransactions };
