import etherscanApi from "etherscan-api";
import { NotFoundError } from "../errors/index.js";
const fetchTransactions = async (req, res, next) => {
  const { address, fromBlock } = req.body;
  try {
    console.log(address, fromBlock);

    const api = etherscanApi.init(process.env.API_KEY);
    const tokentx = await api.account.tokentx(
      address,
      null,
      fromBlock,
      99999999,
      "asc"
    );
    req.results = tokentx.result;
    next();
  } catch (error) {
    const newError = new NotFoundError(`Couldn't inspect address: ${address}`);
    next(newError);
  }
};

export { fetchTransactions };
