import { Download, Loader, Mail } from 'lucide-react'
import React, { useState } from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({transactions,onDelete,onEmail,onDownload,loadingState}) => {



  return (
    <div className='mt-3 shadow-md shadow-purple-100 p-2 rounded-lg'>
        <div className='flex flex-row justify-between items-center-safe'>
            <h5 className='text-lg '>Income sources</h5>
            <div className='flex flex-row items-center-safe justify-end-safe gap-2'>
                <button className='bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200 ' onClick={onEmail} >
                    <Mail size={15} className='text-base' />
                    {
                        loadingState ? <p>Emailing...</p> : <p>Email</p>
                    }
                </button>
                <button onClick={onDownload} className='bg-slate-100 rounded-sm px-5 w-auto py-1 flex flex-row gap-2 items-center-safe cursor-pointer hover:bg-purple-100 hover:text-purple-800 transition-colors duration-200'>
                    
                    {
                        loadingState ? (<><Loader className='w-4 h-4 animate-spin'/> Downloading</>) : (<><Download size={15} className='text-base'/> Download</>)
                    }
                </button>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {/*display the incomes */}
            {
                transactions?.map((income)=>(
                    <TransactionInfoCard key={income?.id}
                    title={income?.name}
                    icon={income?.icon}
                    date={moment(income?.date).format('Do MMM YYYY')}
                    amount={income?.amount}
                    type="income"
                    onDelete={()=>onDelete(income?.id)}/>
                ))
            }
        </div>
    </div>
  )
}

export default IncomeList