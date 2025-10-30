import { Loader } from 'lucide-react';
import React, { useState } from 'react'

const DeleteAlert = ({content,onDelete,setOpenDeleteAlert}) => {

const [loading,setLoading] = useState(false);

const handleDelete =async()=> {
    try {
        setLoading(true)
        const response = await onDelete();
        if(response?.status===200){
            setLoading(false)
        }
    }finally {
        setLoading(false)
    }
}
  return (
    <>
    <p className='text-sm'>{content}</p>
    <div className='flex flex-row items-center-safe justify-end-safe gap-3 mt-6'>
        <button className='bg-red-800 text-white font-medium px-6 py-2 rounded-lg' onClick={onDelete} type='button'>{
            
            loading ? (<div className='flex flex-row items-center-safe gp-3'>
                <Loader className='w-4 h-4 animate-spin'/>Deleting...
            </div>) : (<>Delete</>)
            
            }</button>
        <button className='bg-blue-800 text-white font-medium rounded-lg px-6 py-2' onClick={()=>setOpenDeleteAlert({show:false,data:null})}>Cancel</button>
    </div>
    </>
  )
}

export default DeleteAlert