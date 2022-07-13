import { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";

import AccountService from "../services/account";

export const AccountContext = createContext();

export const AccountProvider = (props) => {
  const [account, setAccount] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchingDone, setIsFetchingDone] = useState(false);

  const [currencyContext, setCurrencyContext] = useState(null);
  const [isCurrencyContextFetching, setIsCurrenyContextFetching] =
    useState(false);
  const [currencyContextError, setCurrencyContextError] = useState(null);

  const [allCurrencyContexts, setAllCurrencyContexts] = useState(null);
  const [isAllCurrencyContextsFetching, setIsAllCurrencyContextsFetching] =
    useState(false);
  const [allCurrencyContextsError, setAllCurrencyContextsError] =
    useState(null);

  const getAccount = useCallback(async () => {
    try {
      setError(null);
      setIsFetching(true);

      const result = await AccountService.getAccount();

      // console.log("getAccount result:", result);

      setIsFetchingDone(true);
      setIsFetching(false);
      setAccount(result.data);
    } catch (error) {
      // console.log("getAccount error:", error);

      const errorMessage = error.message;

      setIsFetchingDone(true);
      setIsFetching(false);
      setError(errorMessage);
    }
  }, []);

  const getCurrencyContext = useCallback(async () => {
    try {
      setCurrencyContextError(null);
      setIsCurrenyContextFetching(true);

      const result = await AccountService.getCurrencyContext();

      // console.log("getCurrencyContext result:", result);

      setIsCurrenyContextFetching(false);
      setCurrencyContext(result.data);
    } catch (error) {
      const errorMessage = error.message;

      setIsCurrenyContextFetching(false);
      setCurrencyContextError(errorMessage);
    }
  }, []);

  const getAllCurrencyContexts = useCallback(async () => {
    try {
      setAllCurrencyContextsError(null);
      setIsAllCurrencyContextsFetching(true);

      const result = await AccountService.getAllCurrencyContexts();

      // console.log("getAllCurrencyContext result:", result);

      setIsAllCurrencyContextsFetching(false);
      setAllCurrencyContexts(result.data);
    } catch (error) {
      const errorMessage = error.message;

      setIsAllCurrencyContextsFetching(false);
      setAllCurrencyContextsError(errorMessage);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        getAccount,
        isFetching,
        error,
        isFetchingDone,
        currencyContext,
        isCurrencyContextFetching,
        currencyContextError,
        getCurrencyContext,
        allCurrencyContexts,
        getAllCurrencyContexts,
        isAllCurrencyContextsFetching,
        allCurrencyContextsError,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
