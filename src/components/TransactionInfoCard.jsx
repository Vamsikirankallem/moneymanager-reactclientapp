import { IndianRupee, Trash, TrendingDown, TrendingUp, UtensilsCrossed } from 'lucide-react';
import React from 'react'
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import { addThousandsSeparator } from '../util/util';

const TransactionInfoCard = ({icon,title,date,amount,type,hideDeleteBtn,onDelete}) => {

    const getAmountStyles = ()=> type==='income' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900';
    

  

  return (
    <div className='group relative flex items-center-safe gap-4 mt-2 p-3 rounded-lg hover:bg-purple-100/60 transition-colors duration-200'>
        <div className='w-12 h-12 flex items-center-safe justify-center-safe text-xl text-gray-800 bg-gray-100 rounded-full'>
            {
                icon ? (<img src={icon} alt={title} className='w-6 h-6'
                />) : (<UtensilsCrossed className='text-purple-800'/>)
            }
        </div>
        <div className='flex-1 flex items-center-safe justify-between'>
            <div>
                <p className='text-sm text-gray-700 font-medium'>{title}</p>
                <p className='text-xs text-gray-400 font-[500]'>{date}</p>
            </div>
            <div className='flex items-center-safe gap-2'>
                {
                    !hideDeleteBtn && (
                        <button onClick={onDelete} className='text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'><Trash size={18}/></button>
                    )
                }
                <div className={`w-auto flex flex-row items-center-safe gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                   <h6 className='text-xs font-semibold'>
                    {
                        type==="income" ? '+' : '-'
                    }
                    ₹{addThousandsSeparator(amount)}
                   </h6>
                   {
                    type==="income" ? (<TrendingUp size={15}/>) : (<TrendingDown size={15}/>)
                   }
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionInfoCard