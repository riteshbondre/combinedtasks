import "./App.css";
import React,{useState} from "react";
import Header from "./components/Header";
import AddTransaction from "./components/AddTransaction";
import OnlineAddTransaction from "./components/OnlineAddTransactions";
import TransactionList from "./components/TransactionList";
import HangmanHomePage from "./hangman/HangmanHomePage";
import { GlobalProvider } from "./context/GlobalState";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const [count, setCount] = useState(0)
  let abc;
const handlecount = (amount) => {
       abc = count + +amount;
       setCount(abc)
}
  var connected = navigator.onLine;
  return (
    <GlobalProvider>
      <Router>
        <Header abc = {count}/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Main} />
           
            {connected && (
              <Route
                path="/transaction"
                exact
              >
                <OnlineAddTransaction handlecount={handlecount} />
              </Route>
            )}
            {!connected && (
              <Route
              path="/transaction"
              exact
              component={AddTransaction}
            />
            )}
             <Route path="/hangman" exact component={HangmanHomePage} />
             <Route path="/history" exact component={TransactionList} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
};

export default App;
