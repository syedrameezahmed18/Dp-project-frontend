import "./App.css";

import { AccountProvider } from "./context/AccountContext";

import Navigation from "./Navigation/Navigation";

function App() {
  return (
    <AccountProvider>
      <Navigation />
    </AccountProvider>
  );
}

export default App;
