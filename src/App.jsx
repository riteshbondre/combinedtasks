import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import AddTransaction from "./components/AddTransaction";
import OnlineAddTransaction from "./components/OnlineAddTransactions";
import TransactionList from "./components/TransactionList";
import HangmanHomePage from "./hangman/HangmanHomePage";
import { GlobalProvider } from "./context/GlobalState";
import { GlobalContext } from "./context/GlobalState";
import Main from "./components/Main";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../src/firebase/config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { base64StringToBlob } from "blob-util";
const offlineStorage = projectFirestore.collection("transactions");
const storageRef = projectStorage.ref(
  "blobtransaction" + Math.floor(Date.now() / 1000)
);

const App = () => {
  const [count, setCount] = useState(0);
  let abc;
  const handlecount = (amount) => {
    abc = count + +amount;
    setCount(abc);
  };

  const UploadData = (transaction, blob) => {
    storageRef.put(blob).then(
      (snapshot) => {
        storageRef
          // .child(image.name)
          .getDownloadURL()
          .then((url) => {
            offlineStorage.add({
              timestamp: timestamp(),
              text: transaction.text,
              name: transaction.name,
              amount: transaction.amount,
              date: transaction.date,
              imageUrl: url,
            });
          });
      },
      (error) => {
        console.log(error);
        alert(error.message);
      }
    );
  };
  const handleConnectionChange = async (event) => {
    const localData = JSON.parse(localStorage.getItem("state"));
    console.log(localData);
    if (event.type == "online") {
      console.log("You are now back online.");
      // console.log(transactions.length);
      for (var index = 0; index < localData?.transactions?.length; index++) {
        const trimmedBaseString = localData.transactions[index].image
          .split(",")
          .pop();
        var blob = base64StringToBlob(trimmedBaseString, "image/jpeg");
        console.log(blob);
        UploadData(localData.transactions[index], blob);
      }
      localStorage.removeItem("state");
    }

    // console.log(new Date(event.timeStamp));
  };
  window.removeEventListener("online", handleConnectionChange);
  window.addEventListener("online", handleConnectionChange);

  var connected = navigator.onLine;
  return (
    <GlobalProvider>
      <Router>
        <Header abc={count} />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Main} />

            {connected && (
              <Route path="/transaction" exact>
                <OnlineAddTransaction handlecount={handlecount} />
              </Route>
            )}
            {!connected && (
              <Route path="/transaction" exact component={AddTransaction} />
            )}
            {/* {<Route path="/hangman" exact component={HangmanHomePage} />} */}
            <Route path="/hangman" exact>

              {

                count >= 1000 && connected ? <HangmanHomePage /> : <Main />

              }</Route>
            <Route path="/history" exact component={TransactionList} />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
};

export default App;
