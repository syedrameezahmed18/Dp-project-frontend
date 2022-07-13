import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AccountContext } from "../context/AccountContext";

import AccountService from "../services/account";

import Button from "../Components/Button/Button";

export default function Transactions() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRouted = location?.state?.isRouted;

  const { currencyContext, getCurrencyContext, account, getAccount } =
    useContext(AccountContext);

  useEffect(() => {
    if (!isRouted) {
      navigate("/");
      return window.location.reload();
    }

    if (currencyContext === null) {
      getCurrencyContext();
    }
    if (account === null) {
      getAccount();
    }

    if (account?.name === null) {
      navigate("/");
      return window.location.reload();
    }
  }, [
    account,
    currencyContext,
    getAccount,
    getCurrencyContext,
    isRouted,
    navigate,
  ]);

  const transactions = account?.transactions;
  const transactionHeadings = [
    "Transaction ID",
    "Transaction Date",
    "Sender Account Number",
    "Receiver Account Number",
    "Amount",
    "Currency Unit",
    "Tax Rate",
    "Final Amount",
  ];

  const getPercentage = (number) => {
    return Number(String(number).split(".")[1]);
  };

  const MakeTransaction = React.memo(function MakeTransaction() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({
      receiverAccountNumber: "",
      amount: "",
    });
    const [isMakingTransaction, setIsMakingTransaction] = useState(false);

    const toggleForm = () => {
      setIsFormOpen((prev) => !prev);
    };

    const handleFormDetails = (event) => {
      setFormDetails((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    };

    const handleSubmit = async () => {
      if (
        [
          Boolean(formDetails.receiverAccountNumber),
          Boolean(formDetails.amount),
        ].includes(false)
      ) {
        return alert("Please enter both fields.");
      }

      const updateObject = {
        ...formDetails,
        senderAccountNumber: account.acccountNumber,
      };

      try {
        setIsMakingTransaction(true);

        const result = await AccountService.makeTransaction(updateObject);

        // console.log("handleSubmit result:", result);
        setIsMakingTransaction(false);

        result.data.forEach((message) => {
          alert(message);
        });
        getAccount();
      } catch (error) {
        const errorMessage = error?.response?.data || error.message;

        setIsMakingTransaction(false);
        alert(errorMessage);
      }
    };

    return (
      <section className="transactions__make-transaction">
        <div className="transactions__make-transaction-button">
          {!isFormOpen && (
            <Button
              text="Make Transaction"
              size="medium"
              handlers={{ onClick: toggleForm }}
            />
          )}
          {isFormOpen && (
            <form>
              <fieldset>
                <legend>New transaction</legend>

                <div className="make-transaction__fields">
                  <label htmlFor="receiverAccountNumber">
                    Receiver Account Number:{" "}
                  </label>
                  <input
                    type="text"
                    className="input-base make-transaction__input"
                    name="receiverAccountNumber"
                    id="receiverAccountNumber"
                    value={formDetails.receiverAccountNumber}
                    onChange={handleFormDetails}
                  />

                  <label htmlFor="amount">
                    {`Amount (Your balance: ${account.balance.toFixed(2)} ${
                      account.currencyUnit
                    }):`}{" "}
                  </label>
                  <input
                    type="text"
                    className="input-base make-transaction__input"
                    name="amount"
                    id="amount"
                    value={formDetails.amount}
                    onChange={handleFormDetails}
                  />

                  <em className="make-transaction__final-amount">
                    *Final transaction amount is{" "}
                    {(
                      formDetails.amount -
                      formDetails.amount * (currencyContext?.taxRate || 0)
                    ).toFixed(2)}
                    &nbsp;
                    {currencyContext?.currencyUnit || account.currencyUnit}
                    &nbsp;after deducting{" "}
                    {getPercentage(currencyContext?.taxRate || 0)}% tax.
                  </em>
                </div>
              </fieldset>
            </form>
          )}

          {isFormOpen && (
            <div className="make-transaction__action-buttons">
              <Button
                text="Submit"
                handlers={{ onClick: handleSubmit }}
                isDisabled={isMakingTransaction}
              />
              <Button
                text="Cancel"
                handlers={{ onClick: toggleForm }}
                isDisabled={isMakingTransaction}
              />
            </div>
          )}
        </div>
      </section>
    );
  });

  return (
    <div className="transactions">
      <Button text="Back" handlers={{ onClick: () => navigate(-1) }} />
      <h1 className="transactions__heading">Your transactions</h1>

      {transactions?.length === 0 ? (
        <p>No transactions!</p>
      ) : (
        <section className="transactions__transaction">
          {transactions?.map((transaction, index) => {
            return (
              <div className="transactions__transaction-detail" key={index}>
                {Object.values(transaction).map((elem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <h4 className="transactions__transaction-property-heading">
                        {transactionHeadings[index]}
                      </h4>
                      <p className="transactions__transaction-property-value">
                        {transactionHeadings[index] === "Tax Rate"
                          ? `${getPercentage(elem)}%`
                          : elem}
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </section>
      )}

      <MakeTransaction />
    </div>
  );
}
