import { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AccountContext } from "../context/AccountContext";

import AccountService from "../services/account";

import Button from "../Components/Button/Button";

import Avatar from "../assets/icons/avatar.png";
import BankIcon from "../assets/icons/bank.png";

export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRouted = location?.state?.isRouted;

  const {
    account,
    getAccount,
    isFetching,
    error,
    isFetchingDone,
    allCurrencyContexts,
    getAllCurrencyContexts,
  } = useContext(AccountContext);

  const [formDetails, setFormDetails] = useState({
    currencyUnit: account?.currencyUnit,
    balance: "",
  });
  const [isChangeCurrencyOpen, setIsChangeCurrencyOpen] = useState(false);
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false);
  const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isRouted) {
      navigate("/");
      return window.location.reload();
    }

    if (account === null) {
      getAccount();
    }
    if (allCurrencyContexts === null) {
      getAllCurrencyContexts();
    }

    if (account?.currencyUnit) {
      setFormDetails((prev) => ({
        ...prev,
        currencyUnit: account.currencyUnit,
      }));
    }
  }, [
    account,
    allCurrencyContexts,
    getAccount,
    getAllCurrencyContexts,
    isRouted,
    navigate,
  ]);

  useEffect(() => {
    if (isFetchingDone) {
      if (error || !account?.name) {
        setTimeout(() => {
          navigate("/");
          return window.location.reload();
        }, 500);
      }
    }
  }, [account?.name, error, isFetching, isFetchingDone, navigate]);

  const toggleChangeCurrencyOpen = () => {
    setIsChangeCurrencyOpen((prev) => !prev);
  };

  const toggleAddSubscriptionOpen = () => {
    setIsAddSubscriptionOpen((prev) => !prev);
  };

  const toggleAddBalanceOpen = () => {
    setIsAddBalanceOpen((prev) => !prev);
  };

  const handleFormDetails = (event, key) => {
    setFormDetails((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleSaveCurrencyUnit = async () => {
    try {
      setIsSaving(true);

      const result = await AccountService.changeCurrencyUnit(
        formDetails.currencyUnit.toLowerCase()
      );

      // console.log("saveCurrencyUnit result:", result);

      alert("Currency changed successfully!");
      setIsSaving(false);
      toggleChangeCurrencyOpen();
      getAccount();
    } catch (error) {
      const errorMessage = error?.response?.data || error.message;

      setIsSaving(false);
      alert("ERROR!\n" + errorMessage);
    }
  };

  const handleAddBalance = async () => {
    if (!formDetails.balance) return alert("Please enter an amount to add.");

    try {
      setIsSaving(true);

      const result = await AccountService.addBalance({
        balance: formDetails.balance,
      });

      setIsSaving(false);
      setFormDetails((prev) => ({
        ...prev,
        balance: null,
      }));
      toggleAddBalanceOpen();
      getAccount();
      alert(result.data);
    } catch (error) {
      const errorMessage = error?.response?.data || error.message;

      setIsSaving(false);
      alert(errorMessage);
    }
  };

  const AddSubscription = () => {
    const [formDetails, setFormDetails] = useState({
      sms: "",
      email: "",
    });
    const [isSetting, setIsSetting] = useState(false);

    const dialogRef = useRef(null);

    useEffect(() => {
      const offsetY = dialogRef.current.offsetTop;

      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      });
    }, []);

    const handleFormDetails = (event, key) => {
      setFormDetails((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

    const handleSubscription = async (type) => {
      if (!formDetails[type]) {
        return alert("Please enter the required field.");
      }

      try {
        setIsSetting(true);

        const result = await AccountService.addSubscriber(
          type,
          formDetails[type]
        );

        alert(result.data);
        setIsSetting(false);
        getAccount();
        toggleAddSubscriptionOpen();
      } catch (error) {
        const errorMessage = error.message;

        setIsSetting(false);
        alert("ERROR!\n" + errorMessage);
      }
    };

    const handleUnsubscription = async (type) => {
      try {
        setIsSetting(true);

        const result = await AccountService.removeSubscriber(type);

        alert(result.data);
        setIsSetting(false);
        getAccount();
        toggleAddSubscriptionOpen();
      } catch (error) {
        const errorMessage = error.message;

        setIsSetting(false);
        alert("ERROR!\n" + errorMessage);
      }
    };

    return (
      <div className="add-subscription">
        <dialog className="add-subscription__dialog" open ref={dialogRef}>
          <header>
            <h2>Manage Subscriptions</h2>
            <strong
              className="add-subscription__close-button"
              onClick={() => toggleAddSubscriptionOpen()}
            >
              X
            </strong>
          </header>

          <main>
            <div className="add-subscription__subscribe">
              <h4>SMS</h4>
              {!account.subscriptions["sms"].isSubscribed && (
                <div className="add-subscription__form">
                  <input
                    type="text"
                    placeholder="Enter your phone number..."
                    className="input-base add-subscription__input-text"
                    value={formDetails.sms}
                    onChange={(event) => handleFormDetails(event, "sms")}
                  />
                  <Button
                    text="Subscribe"
                    handlers={{ onClick: () => handleSubscription("sms") }}
                    isDisabled={isSetting}
                  />
                </div>
              )}
              {account.subscriptions["sms"].isSubscribed && (
                <Button
                  text="Unsubscribe"
                  handlers={{
                    onClick: () => handleUnsubscription("sms"),
                  }}
                />
              )}
            </div>
            <div className="add-subscription__subscribe">
              <h4>Email</h4>
              {!account.subscriptions["email"].isSubscribed && (
                <div className="add-subscription__form">
                  <input
                    type="text"
                    placeholder="Enter your email address..."
                    className="input-base add-subscription__input-text"
                    value={formDetails.email}
                    onChange={(event) => handleFormDetails(event, "email")}
                  />
                  <Button
                    text="Subscribe"
                    handlers={{ onClick: () => handleSubscription("email") }}
                    isDisabled={isSetting}
                  />
                </div>
              )}
              {account.subscriptions["email"].isSubscribed && (
                <Button
                  text="Unsubscribe"
                  handlers={{
                    onClick: () => handleUnsubscription("email"),
                  }}
                />
              )}
            </div>
          </main>
        </dialog>
      </div>
    );
  };

  return (
    <div className="account">
      <h1 className="account__details-heading">Account Details</h1>

      {isFetching && (
        <div className="account__fetch-status">
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className="account__fetch-status">
          <h2 className="account__fetch-error">{error}</h2>
        </div>
      )}

      {account && (
        <div className="account__details">
          <div className="account__personal-details">
            <div className="account__personal-details-icon-container">
              <img
                src={Avatar}
                alt="user"
                className="account__personal-details-icon"
              />
            </div>
            <div className="account__personal-detail">
              <p className="account__personal-detail-heading">Name</p>{" "}
              <p className="account__personal-detail-value">{account?.name}</p>
            </div>
            <div className="account__personal-detail">
              <p className="account__personal-detail-heading">
                Father&apos;s Name
              </p>{" "}
              <p className="account__personal-detail-value">
                {account?.fatherName}
              </p>
            </div>
            <div className="account__personal-detail">
              <p className="account__personal-detail-heading">Address</p>{" "}
              <p className="account__personal-detail-value">
                {account?.address}
              </p>
            </div>
            <div className="account__personal-detail">
              <p className="account__personal-detail-heading">CNIC number</p>{" "}
              <p className="account__personal-detail-value">
                {account?.cnicNum}
              </p>
            </div>
            <div className="account__personal-detail">
              <p className="account__personal-detail-heading">Age</p>{" "}
              <p className="account__personal-detail-value">{account?.age}</p>
            </div>
          </div>
          <br />
          <div className="account__bank-details">
            <div className="account__bank-details-icon-container">
              <img
                src={BankIcon}
                alt="Bank"
                className="account__bank-details-icon"
              />
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Account Number</p>{" "}
              <p className="account__bank-detail-value">
                {account?.accountNumber}
              </p>
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Account Type</p>{" "}
              <p className="account__bank-detail-value">
                {account?.accountType}
              </p>
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Balance</p>{" "}
              <p className="account__bank-detail-value">
                {account?.balance.toFixed(2)}
              </p>
              <div className="account__add-balance">
                {!isAddBalanceOpen && (
                  <Button
                    text="Add Balance"
                    handlers={{ onClick: toggleAddBalanceOpen }}
                  />
                )}
                {isAddBalanceOpen && (
                  <>
                    <input
                      type="text"
                      className="input-base account__add-balance-input"
                      size="1"
                      value={formDetails.balance}
                      onChange={(event) => handleFormDetails(event, "balance")}
                      placeholder="Enter amount..."
                    />

                    <div className="account__add-balance-action-buttons">
                      <Button
                        text="Add"
                        handlers={{ onClick: handleAddBalance }}
                      />
                      <Button
                        text="Cancel"
                        handlers={{ onClick: toggleAddBalanceOpen }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Currency unit</p>{" "}
              <p className="account__bank-detail-value">
                {account?.currencyUnit}
              </p>
              <div className="account__change-currency">
                {!isChangeCurrencyOpen && (
                  <Button
                    text="Change"
                    handlers={{ onClick: toggleChangeCurrencyOpen }}
                  />
                )}
                {isChangeCurrencyOpen && (
                  <>
                    <select
                      value={formDetails.currencyUnit}
                      onChange={(event) =>
                        handleFormDetails(event, "currencyUnit")
                      }
                      className="account__change-currency-select"
                    >
                      {allCurrencyContexts.map((item, index) => {
                        return (
                          <option key={index} value={item.currencyUnit}>
                            {item.currencyUnit}
                          </option>
                        );
                      })}
                    </select>

                    <div className="account__change-currency-action-buttons">
                      <Button
                        text="Save"
                        handlers={{ onClick: handleSaveCurrencyUnit }}
                        isDisabled={isSaving}
                      />
                      <Button
                        text="Cancel"
                        handlers={{ onClick: toggleChangeCurrencyOpen }}
                        isDisabled={isSaving}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="account__bank-detail">
              <div className="account__detail-notification-subscriptions-container">
                <p className="account__bank-detail-heading">
                  Notification subscriptions
                </p>{" "}
                <div className="account__detail-notification-subscriptions">
                  {Object.keys(account?.subscriptions || {}).map(
                    (item, index) => {
                      return (
                        <div
                          className="account__detail-notification-subscription"
                          key={index}
                        >
                          <span>{`${item[0].toUpperCase()}${item.slice(
                            1
                          )}`}</span>
                          <span>{`${
                            account.subscriptions[item].isSubscribed === false
                              ? "Not Subscribed"
                              : `Subscribed (${account.subscriptions[item].value})`
                          }`}</span>
                        </div>
                      );
                    }
                  )}
                </div>
                <Button
                  text="Manage Subscriptions"
                  handlers={{ onClick: toggleAddSubscriptionOpen }}
                />
              </div>
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Your Cards</p>{" "}
              <Button
                text="Manage Cards"
                handlers={{
                  onClick: () =>
                    navigate("/account/manage-cards", {
                      state: { isRouted: true },
                    }),
                }}
              />
            </div>

            <div className="account__bank-detail">
              <p className="account__bank-detail-heading">Your transactions</p>

              <Link to="/account/transactions" state={{ isRouted: true }}>
                <Button text="View transactions" />
              </Link>
            </div>
          </div>

          {isAddSubscriptionOpen && <AddSubscription />}
        </div>
      )}
    </div>
  );
}
