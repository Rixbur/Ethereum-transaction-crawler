import React from "react";
import { useReducer, useContext } from "react";
import {
  DATA_FETCHED,
  FETCH_DATA,
  RESET_ADDRESS_STATE,
  GET_ADDRESS_INFO,
  GET_ALL_ADDRESSES,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";
const AppContext = React.createContext();
const initialState = {
  isLoading: false,
  address: "",
  fromBlock: "",
  result: [],
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startInspect = async ({ address, fromBlock }) => {
    dispatch({
      type: FETCH_DATA,
      payload: { address, fromBlock },
    });
    const { data } = await axios.post("http://localhost:5000/api/v1", {
      address: address,
      fromBlock: fromBlock,
    });
    dispatch({
      type: DATA_FETCHED,
      payload: {
        result: data.result,
      },
    });
  };
  const resetState = () => {
    dispatch({ type: RESET_ADDRESS_STATE });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        startInspect,
        resetState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
