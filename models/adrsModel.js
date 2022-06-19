import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  trxs: {
    type: [mongoose.Schema.Types.String],
    ref: "Transaction",
    required: true,
    default: [],
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
  tokens: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
});

const Address = mongoose.model("Address", AddressSchema);

async function createAnAddress(address, transactionIds, setOfTokens) {
  const newAddress = new Address({
    _id: new mongoose.Types.ObjectId(),
    address: address,
    trxs: transactionIds,
    lastUpdate: new Date(),
    tokens: setOfTokens,
  });
  return newAddress.save();
}
async function getAddressByID(address) {
  return await Address.findOne({ address: address }).exec();
}

async function getAddressDetails(address, skip, limit) {
  return await Address.findOne({ address: address })
    .populate([
      {
        path: "trxs",
        select: "_id from to amount tokenSymbol date",
        model: "Transaction",
        options: { sort: {}, skip: skip, limit: limit },
        match: {},
      },
    ])
    .exec();
}

async function updateAddress(address, transactionIds, setOfTokens) {
  const date = new Date();
  return await Address.findOneAndUpdate(
    { address: address },
    { trxs: transactionIds, tokens: setOfTokens, lastUpdate: date }
  );
}

export { createAnAddress, getAddressByID, getAddressDetails, updateAddress };
