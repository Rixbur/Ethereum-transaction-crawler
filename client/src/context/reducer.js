import {
  FETCH_DATA,
  DATA_FETCHED,
  RESET_ADDRESS_STATE,
  GET_ADDRESS_INFO,
  GET_ALL_ADDRESSES,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === FETCH_DATA) {
    return {
      ...state,
      isLoading: true,
      address: action.payload.address,
      fromBlock: action.payload.fromBlock,
    };
  }
  if (action.type === DATA_FETCHED) {
    return {
      ...state,
      result: action.payload.result,
      isLoading: false,
    };
  }
  if (action.type === RESET_ADDRESS_STATE) {
    return {
      ...initialState,
    };
  }
  if (action.type) throw new Error(`no such actions: ${action.type}`);
};

export default reducer;
