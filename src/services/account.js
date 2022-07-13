import http from "./http-common";

class AccountService {
  createAccountBuilder() {
    return http.post("/account/createAccountBuilder");
  }

  setName(data) {
    return http.post("/account/setName", data);
  }

  setFatherName(data) {
    return http.post("/account/setFatherName", data);
  }

  setAddress(data) {
    return http.post("/account/setAddress", data);
  }

  setCnicNum(data) {
    return http.post("/account/setCnicNum", data);
  }

  setAge(data) {
    return http.post("/account/setAge", data);
  }

  createAccount(accountType) {
    return http.post(`/account/createAccount/${accountType}`);
  }

  getAccount() {
    return http.get("/account/getAccount");
  }

  addBalance(data) {
    return http.post("/account/addBalance", data);
  }

  getCurrencyContext() {
    return http.get("/account/getCurrencyContext");
  }

  getAllCurrencyContexts() {
    return http.get("/account/getAllCurrencyContexts");
  }

  changeCurrencyUnit(currencyUnit) {
    return http.post(`/account/changeCurrencyUnit/${currencyUnit}`);
  }

  makeTransaction(data) {
    return http.post("/account/makeTransaction", data);
  }

  getTransactions() {
    return http.get("/account/getTransactions");
  }

  addSubscriber(subscriptionType, value) {
    return http.post(
      `/account/addSubscriber/${subscriptionType}?value=${value}`
    );
  }

  removeSubscriber(subscriptionType) {
    return http.post(`/account/removeSubscriber/${subscriptionType}`);
  }

  createCreditCard(variant) {
    return http.post(`/account/createCreditCard/${variant}`);
  }

  createDebitCard(variant) {
    return http.post(`/account/createDebitCard/${variant}`);
  }

  changeCreditCard(variant) {
    return http.put(`/account/changeCreditCard/${variant}`);
  }

  changeDebitCard(variant) {
    return http.put(`/account/changeDebitCard/${variant}`);
  }

  removeCreditCard() {
    return http.delete("/account/removeCreditCard");
  }

  removeDebitCard() {
    return http.delete("/account/removeDebitCard");
  }
}

export default new AccountService();
