import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions,onMore}) => {
  return (
    <div className='shadow-md shadow-gray-200 p-4 relative'>
        <div className='flex  items-center-safe justify-between'>
            <h4 className='text-lg'>Recent Transactions</h4>
            <button  className='flex items-center-safe  gap-3 px-6 py-2 bg-stone-400 text-white font-medium text-md rounded-lg' onClick={onMore}>
                More <div><ArrowRight className='text-base mt-0.5' size={15}/></div>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item)=>(
                <TransactionInfoCard 
                key={item?.id}
                title={item?.name}
                icon={item?.icon}
                date={moment(item?.date).format("Do MMM YYYY")}
                amount={item?.amount}
                type={item?.type}
                hideDeleteBtn/>
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions