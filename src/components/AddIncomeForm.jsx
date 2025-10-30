import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup'
import Input from './Input'
import { Loader } from 'lucide-react'

const AddIncomeForm = ({onAddIncome,categories}) => {
const [income,setIncome]  = useState({
    name : "",
    amount : "",
    date : "",
    icon : "",
    category_id : ""
})

const [loading,setLoading] = useState(false);

const categoryOptions = categories.map((category)=>({
    value : category?.id,
    label : category?.name
}))

const handleChange= (key,value)=> {
   setIncome({...income,[key]:value})
}

const handleAddIncome = async()=> {
  try {
    setLoading(true);
    const response = await onAddIncome(income);
    if(response?.status===201){
      setLoading(false)
    }
  } catch (error) {
    
  }
}

useEffect(()=>{
  if(categories.length>0 && !income?.category_id){
    setIncome((prev)=>({...prev,category_id:categories[0]?.id}))
  }
},[categories,income?.category_id])


  return (
    <div>
       <EmojiPickerPopup 
       icon={income?.icon}
       onSelect={(seletedIcon)=>handleChange('icon',seletedIcon)}/>
       
       <Input 
       value={income?.name}
       onChange={({target})=>handleChange('name',target?.value)}
       label="Income Source"
       placeholder="e.g., Salary, Freelancing, Bonus"/>
      
       <Input
       value={income?.category_id}
       label="Category"
       onChange={({target})=>handleChange('category_id',target?.value)}
       isSelect={true}
       options={categoryOptions}/>
       
       <Input 
       value={income?.amount}
       onChange={({target})=>handleChange('amount',target?.value)}
       label="Amount"
       placeholder="e.g., 500.00"
       type="number"/>
       <Input
       value={income?.date}
       onChange={({target})=>handleChange('date',target?.value)}
       placeholder=""
       type="date"
       label="Date"/>
       <div className='flex justify-end-safe mt-6'>
        <button onClick={handleAddIncome}
        className='bg-purple-800 text-white px-6 py-1.5 rounded-xl'>
            {
              loading ? (<div className='flex flex-row items-center-safe gap-2'>
              <Loader className='w-4 h-4 animate-spin'></Loader>Adding...</div>) : 'Add Income' 
            }
        </button>
       </div>
    </div>
  )
}

export default AddIncomeForm