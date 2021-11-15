import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    // list item style
    const sign = transaction.amount < 0 ? '-' : '+'
    const className = transaction.amount < 0 ? 'minus' : 'plus'
    return (
        <li className={className}>
            <span>{transaction.date} </span> 
            <span>{transaction.text}</span> 
             {transaction.name} <span>{sign}${Math.abs(transaction.amount)}</span>
             <span><img src={transaction.image} alt="img" /></span>
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}

export default Transaction
