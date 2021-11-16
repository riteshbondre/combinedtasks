import React from 'react'
import Accordion from './Accordion';
import ShowTransactions from './ShowTransactions';

const TransactionList = () => {

    return (
        <div className='history'>
            <h3>History</h3>
            <ul className="list">
                <Accordion />
            </ul>
        </div>
    )
}

export default TransactionList
