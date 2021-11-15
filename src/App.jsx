import './App.css'
import React from 'react'
import Header from './components/Header'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import { GlobalProvider } from './context/GlobalState'
import Main from './components/Main'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
    return (
        <GlobalProvider>
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/history" exact component={TransactionList} />
                        <Route path='/transaction' exact component={AddTransaction} />
                    </Switch>
                </div>
            </Router>
        </GlobalProvider>
    )
}

export default App

