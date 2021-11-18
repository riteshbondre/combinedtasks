import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useFirestore from '../hooks/useFirestore';
import { calcIncome,clacAmount } from '../helper/reUsableFunctions'

const Header = ({abc}) => {
    console.log(abc)
    const connected=navigator.onLine
    const [count, setCount] = useState(0)
    const { docs } = useFirestore('transactions');
    // console.log(docs)
    const Income = calcIncome(clacAmount(docs))
    // console.log(Income)



    return (
        <div className="ui menu">
            <div className="header item">
                <h2>Expenses Tracker</h2>
            </div>
            <div className="right menu">
                <Link to="/" >
                    <a className=" item" href="$">
                        Dashboard
                    </a>
                </Link>
                <Link to="/transaction" >
                    <a className=" item" href="$">
                        Add Transaction
                    </a>
                </Link>
                {
                    (abc >= 1000 && connected) && (
                        <Link to="/hangman" >
                    <a className=" item" href="$">
                        Play Game
                    </a>
                </Link>
                    )
                }
                
                <Link to='/history'>
                    <a className="item" href="$">
                        Transaction  History
                    </a>
                </Link>
            </div>

        </div >
    )
}

export default Header
