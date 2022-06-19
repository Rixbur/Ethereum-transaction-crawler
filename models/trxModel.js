import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const TransactionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  tokenSymbol: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});
TransactionSchema.plugin(mongoosePaginate);
const Transaction = mongoose.model("Transaction", TransactionSchema);

async function paginateThroughTransactions(page = 1, limit = 10) {
  return await Transaction.paginate({}, { page, limit, sort: "tokenSymbol" });
}
async function getTransactionById(transactionId) {
  return await Transaction.findOne({ _id: transactionId }).exec();
}

async function createTransaction(result) {
  const transaction = new Transaction();
  transaction.from = result.from || "";
  transaction.to = result.to || "";
  transaction.amount = result.value || "";
  transaction.tokenSymbol = result.tokenSymbol || "";
  const timeStamp = parseInt(result.timeStamp) || 0;
  transaction.date = timeStamp;
  transaction._id = result.hash;
  // if (!_id || !tokenSymbol || !timeStamp) return;
  return await transaction.save();
}

export { paginateThroughTransactions, getTransactionById, createTransaction };
