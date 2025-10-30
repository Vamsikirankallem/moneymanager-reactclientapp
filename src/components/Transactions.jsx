import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const Transactions = ({transactions,onMore,type,title}) => {
  return (
    <div className='shadow-md shadow-gray-200 p-4'>
        <div className='flex flex-row items-center-safe justify-between'>
            <h5 className='text-lg'>{title}</h5>
            <button onClick={onMore} className='flex items-center-safe  gap-3 px-6 py-2 bg-stone-400 text-white font-medium text-md rounded-lg'>More <div><ArrowRight className='text-base' size={15}/></div></button>
        </div>
        <div className='mt-6'>
            {
                transactions?.slice(0,5)?.map((item)=> (
                    <TransactionInfoCard
                    key={item?.id}
                    title={item?.name}
                    icon={item?.icon}
                    amount={item?.amount}
                    date={moment(item?.date).format("Do MMM YYYY")}
                    type={type}
                    hideDeleteBtn/>
                ))
            }
        </div>
    </div>
  )
}

export default Transactions