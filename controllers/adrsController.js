import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import { getAddressDetails } from "../models/adrsModel.js";
import filterTimeStamp from "../utils/filterTimeStamp.js";
const filterTransactionsForGivenAddress = async (req, res, next) => {
  try {
    let address = await getAddressDetails(
      req.body.address,
      req.body.skip,
      req.body.limit
    );
    if (!address) {
      throw new NotFoundError(`Couldn't find ${req.body.address}`);
    }
    const tokenSymbolFilter = req.body.tokenSymbol;
    const dateFilter = req.body.date;
    let filteredTrxs = address.trxs;
    if (tokenSymbolFilter) {
      filteredTrxs = filteredTrxs.filter((item) => {
        return item.tokenSymbol.trim() === tokenSymbolFilter.trim();
      });
    }
    if (dateFilter) {
      filteredTrxs = filteredTrxs.filter((item) => {
        return filterTimeStamp(item.date, dateFilter);
      });
    }
    res.status(StatusCodes.OK).json({ response: filteredTrxs });
  } catch (error) {
    next(error);
  }
};

const getAddressInfo = async (req, res, next) => {
  try {
    let address = await getAddressDetails(req.body.address);
    if (!address) {
      throw new NotFoundError(`Couldn't find ${req.body.address}`);
    }
  } catch (error) {
    next(error);
  }
};
export { filterTransactionsForGivenAddress, getAddressInfo };
