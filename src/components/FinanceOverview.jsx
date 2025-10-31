import React from 'react'
import CustomPieChart from './CustomPieChart'
import { addThousandsSeparator } from '../util/util'

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {

    const COLORS = ["#59168B","#016630","#a0090e"]

    const balanceData = [
        {
            name : "Total Balance",
            amount : totalBalance
        },
        {
            name : "Total Income",
            amount : totalIncome
        },
        {
            name : "Total Expense",
            amount : totalExpense
        }
    ]

  return (
    <div className='shadow-md shadow-gray-200 p-4'>
        <div className='flex flex-row items-center-safe'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>
        <CustomPieChart data={balanceData} label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor/>
    </div>
  )
}

export default FinanceOverview