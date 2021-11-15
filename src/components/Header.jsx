import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
