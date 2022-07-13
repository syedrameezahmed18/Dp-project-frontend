import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "../Pages/Account";
import Home from "../Pages/Home";
import ManageCards from "../Pages/ManageCards";
import Transactions from "../Pages/Transactions";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/transactions" element={<Transactions />} />
        <Route path="/account/manage-cards" element={<ManageCards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
