import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AccountContext } from "../context/AccountContext";

import AccountService from "../services/account";

import Button from "../Components/Button/Button";
import BankCard from "../Components/BankCard/BankCard";
import { Bounce } from "react-reveal";

export default function ManageCards() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRouted = location?.state?.isRouted;

  const { account, getAccount, isFetching } = useContext(AccountContext);

  const [isCreditCardFormOpen, setIsCreditCardFormOpen] = useState(false);
  const [isDebitCardFormOpen, setIsDebitCardFormOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    creditCard: "silver",
    debitCard: "silver",
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!isRouted) {
      navigate("/");
      return window.location.reload();
    }

    if (account === null) {
      getAccount();
    }

    if (!account?.name) {
      navigate("/");
      return window.location.reload();
    }
  }, [account, getAccount, isRouted, navigate]);

  const toggleCreditCardFormOpen = () => {
    setIsCreditCardFormOpen((prev) => !prev);
  };

  const toggleDebitCardFormOpen = () => {
    setIsDebitCardFormOpen((prev) => !prev);
  };

  const setIsUpdateTrue = () => {
    setIsUpdate(true);
  };
  const setIsUpdateFalse = () => {
    setIsUpdate(false);
  };

  const handleFormDetails = (event, key) => {
    setFormDetails((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleCardOrder = async (cardType) => {
    try {
      setIsOrdering(true);

      let result;

      switch (cardType) {
        case "creditCard":
          if (isUpdate) {
            result = await AccountService.changeCreditCard(
              formDetails.creditCard
            );
          } else {
            result = await AccountService.createCreditCard(
              formDetails.creditCard
            );
          }
          toggleCreditCardFormOpen();
          break;
        case "debitCard":
          if (isUpdate) {
            result = await AccountService.changeDebitCard(
              formDetails.debitCard
            );
          } else {
            result = await AccountService.createDebitCard(
              formDetails.debitCard
            );
          }
          toggleDebitCardFormOpen();
          break;
        default:
          throw new Error("Invalid card type.");
      }

      setIsOrdering(false);
      getAccount();
      alert(result.data);
    } catch (error) {
      const errorMessage = error?.response?.data || error.message;

      setIsOrdering(false);
      alert("ERROR\n" + errorMessage);
    }
  };

  const handleCardRemove = async (cardType) => {
    if (!window.confirm("Are you sure you want to remove card?")) return;

    try {
      let result;

      setIsOrdering(true);

      switch (cardType) {
        case "creditCard":
          result = await AccountService.removeCreditCard();
          break;
        case "debitCard":
          result = await AccountService.removeDebitCard();
          break;
        default:
          throw new Error("Invalid card type");
      }

      setIsOrdering(false);
      getAccount();
      alert(result.data);
    } catch (error) {
      const errorMessage = error?.response?.data || error.message;

      setIsOrdering(false);
      alert("ERROR\n" + errorMessage);
    }
  };

  const OrderCardForm = (props) => {
    const { variantValue, handlers, buttonsDisabled = false } = props;

    return (
      <form className="order-card-form">
        <label htmlFor="variant">Select variant</label>
        <select
          id="variant"
          className="order-card-form__input-select"
          value={variantValue}
          onChange={handlers?.onVariantChange || null}
        >
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
        </select>

        <div className="order-card-form__action-buttons">
          <Button
            text="Order"
            handlers={{
              onClick: handlers?.onOrderClick || null,
            }}
            isDisabled={buttonsDisabled}
          />
          <Button
            text="Cancel"
            handlers={{ onClick: handlers?.onCancelClick || null }}
            isDisabled={buttonsDisabled}
          />
        </div>
      </form>
    );
  };

  return (
    <div className="manage-cards">
      <Button text="Back" handlers={{ onClick: () => navigate(-1) }} />

      <h1 className="manage-cards__heading">Manage Cards</h1>

      <section className="manage-cards__your-cards-section">
        <h2 className="manage-cards__your-cards-heading">Your Cards</h2>

        <Bounce right>
          <div className="manage-cards__cards-container">
            <div className="manage-cards__credit-card-container">
              <h3 className="manage-cards__credit-card-heading">Credit Card</h3>
              <div className="manage-cards__credit-card-block">
                {isFetching ? (
                  <p>LOADING...</p>
                ) : (
                  <>
                    {!account?.creditCard && <p>No card!</p>}
                    {account?.creditCard && (
                      <>
                        <BankCard
                          cardType={account.creditCard.cardDetails.cardType}
                          cardVariant={account.creditCard.cardDetails.cardVariant.toLowerCase()}
                          cardNumber={account.creditCard.cardDetails.cardNumber}
                          cardHolderName={
                            account.creditCard.cardDetails.cardHolder
                          }
                          cardValidity={
                            account.creditCard.cardDetails.expiryDate
                          }
                        />
                        <div className="manage-cards__update-card-action-buttons">
                          <Button
                            text="Change"
                            handlers={{
                              onClick: () => {
                                toggleCreditCardFormOpen();
                                setIsUpdateTrue();
                              },
                            }}
                            isDisabled={isOrdering}
                          />
                          <Button
                            text="Remove"
                            handlers={{
                              onClick: () => handleCardRemove("creditCard"),
                            }}
                            isDisabled={isOrdering}
                          />
                        </div>
                      </>
                    )}
                    {!account?.creditCard && !isCreditCardFormOpen && (
                      <Button
                        text="Get one"
                        handlers={{
                          onClick: () => {
                            toggleCreditCardFormOpen();
                            setIsUpdateFalse();
                          },
                        }}
                        isDisabled={isOrdering}
                      />
                    )}
                    {isCreditCardFormOpen && (
                      <OrderCardForm
                        variantValue={formDetails.creditCard}
                        handlers={{
                          onVariantChange: (event) =>
                            handleFormDetails(event, "creditCard"),
                          onOrderClick: () => handleCardOrder("creditCard"),
                          onCancelClick: () => toggleCreditCardFormOpen(),
                        }}
                        buttonsDisabled={isOrdering}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="manage-cards__debit-card-container">
              <h3 className="manage-cards__debit-card-heading">Debit Card</h3>
              <div className="manage-cards__debit-card-block">
                {isFetching ? (
                  <p>LOADING...</p>
                ) : (
                  <>
                    {!account?.debitCard && <p>No card!</p>}
                    {account?.debitCard && (
                      <>
                        <BankCard
                          cardType={account.debitCard.cardDetails.cardType}
                          cardVariant={account.debitCard.cardDetails.cardVariant.toLowerCase()}
                          cardNumber={account.debitCard.cardDetails.cardNumber}
                          cardHolderName={
                            account.debitCard.cardDetails.cardHolder
                          }
                          cardValidity={
                            account.debitCard.cardDetails.expiryDate
                          }
                        />
                        <div className="manage-cards__update-card-action-buttons">
                          <Button
                            text="Change"
                            handlers={{
                              onClick: () => {
                                toggleDebitCardFormOpen();
                                setIsUpdateTrue();
                              },
                            }}
                            isDisabled={isOrdering}
                          />
                          <Button
                            text="Remove"
                            handlers={{
                              onClick: () => handleCardRemove("debitCard"),
                            }}
                            isDisabled={isOrdering}
                          />
                        </div>
                      </>
                    )}
                    {!account?.debitCard && !isDebitCardFormOpen && (
                      <Button
                        text="Get one"
                        handlers={{
                          onClick: () => {
                            toggleDebitCardFormOpen();
                            setIsUpdateFalse();
                          },
                        }}
                        isDisabled={isOrdering}
                      />
                    )}
                    {isDebitCardFormOpen && (
                      <OrderCardForm
                        variantValue={formDetails.debitCard}
                        handlers={{
                          onVariantChange: (event) =>
                            handleFormDetails(event, "debitCard"),
                          onOrderClick: () => handleCardOrder("debitCard"),
                          onCancelClick: () => toggleDebitCardFormOpen(),
                        }}
                        buttonsDisabled={isOrdering}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Bounce>
      </section>
    </div>
  );
}
