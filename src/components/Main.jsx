import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { categoryGrouping, dateGrouping } from '../helper/reUsableFunctions'
import Balance from './Balance'
import ChartCard from './pi-charts/ChartCard'


const Main = () => {
    const { transactions } = useContext(GlobalContext);

    // Separating Income and Expenses
    let income = [];
    let expense = [];
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount < 0) {
            let temp = JSON.parse(JSON.stringify(transactions[i]));
            temp.amount = -1 * transactions[i].amount
            expense.push(temp)
        } else {
            income.push(transactions[i])
        }
    }

    // Grouping same category data
    const incomeCategoryGroup = categoryGrouping(income);
    const expensesCategoryGroup = categoryGrouping(expense);

    // Grouping same date data
    const incomeDateGroup = dateGrouping(income);
    const expensesDateGroup = dateGrouping(expense);

    return (
        <div className="main">
            <div className="balance">
                <Balance />
            </div>
            <div>
                <h4>Expenses Pi-chart</h4>
                <ChartCard
                    expensesCategoryGroup={expensesCategoryGroup}
                    expensesDateGroup={expensesDateGroup}
                    incomeDateGroup={incomeDateGroup}
                    incomeCategoryGroup={incomeCategoryGroup}
                />
            </div>

        </div >
    )
}

export default Main
