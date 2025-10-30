import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from "../components/Modal.jsx";
import IncomeList from '../components/IncomeList';
import { Plus } from 'lucide-react';
import axios from 'axios';
import AddIncomeForm from '../components/AddIncomeForm.jsx';
import DeleteAlert from '../components/DeleteAlert.jsx';
import IncomeOverview from '../components/IncomeOverview.jsx';

const Income = () => {

  useUser();

  const [incomeData,setIncomeData] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show : false,
    data : null
  });

  const fetchIncomeDetails = async ()=> {
    try {
      setLoading(true)
      const response = await axiosConfig.get(API_ENDPOINTS.GET_INCOMES);
      if(response?.status===200){
        setIncomeData(response?.data);
        setLoading(false)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message ||`Failed to fetch income details`);
    }finally{
      setLoading(false);
    }
  }

  const fetchIncomeCategories = async ()=> {
       
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      
      if(response?.status===200){
        setCategories(response?.data);
        
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to fetch income categories")
    }
  }



 const handleOpenAddIncome = ()=>{
  setOpenAddIncomeModal((prev)=>!prev)
 }

 //save the income details
 const handleAddIncome = async(income)=>{
  console.log(income)
     const {name,amount,date,icon,category_id} = income;

     //validation
     if(!name.trim()){
      toast.error("Please enter a name");
     }

     if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amout should be a valid number greater than 0");
      return;
     }

     if(!date){
      toast.error("Please select a date");
      return;
     }

     const today = new Date().toISOString().split('T')[0];
     if(date>today){
      toast.error("Date cannot be in the future");
      return;
     }

     if(!category_id){
      toast.error("Please select a category");
     }

     try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{name,amount:Number(amount),date,icon,category_id});
      if(response?.status===201){
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully")
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
     } catch (error) {
      toast.error(error?.data?.message || "Failed to add income")
     }
 }

   const deleteIncome = async (id)=> {
    try {
      
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
    if(response?.status===200){
      toast.success(`Income deleted successfully`)
      setOpenDeleteAlert({show:false,data:null})
      fetchIncomeDetails();
    }
    } catch (error) {
      toast.error(error?.data?.message || `Failed to delete income`)
    }
  }

  const handleEmailIncomeDetails= async()=>{
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EMAIL_SERVICE);
            if (response.status === 200) {
                toast.success("Income details emailed successfully");
            }
        }catch(error) {
            console.error('Error emailing income details:', error);
            toast.error(error.response?.data?.message || "Failed to email income");
        }
  }


  const handleDownloadIncomeDetails = async()=> {
    
    setLoading(true);
          
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
          
          let fileName = "income_details.xlsx";
          const url = window.URL.createObjectURL(new Blob([response?.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download",fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success("Download income details successful")
          setLoading(false);

            } catch (error) {
          toast.error(error?.data?.message || 'Failed to download income details')
        }finally{
          setLoading(false);
        }
   }



  useEffect(()=>{
    fetchIncomeDetails();
    fetchIncomeCategories();
    
  },[])

 

  

  return (
    <Dashboard activeMenu={"Income"}>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            {/*Overview for income with linechart */}
            <button className='flex flex-row items-center-safe gap-2 justify-end-safe absolute right-7 top-28 z-30 bg-green-100 text-green-900 px-5 py-1.5 rounded-lg cursor-pointer text-md font-medium' onClick={handleOpenAddIncome}>
              <Plus size={15} className='text-lg'/>
              <p>Add Income</p>
            </button>
            <IncomeOverview incomeData={incomeData}/>
          </div>
          <IncomeList transactions={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
            loadingState = {loading}/>

          {/*Add Income model */}
          <Modal isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income">
            <AddIncomeForm onAddIncome={(income)=>handleAddIncome(income)} categories={categories}/>
          </Modal>
          {/*Delete Income Modal */}
          <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show:false,data:null})}
          title="Delete Income">
              
              <DeleteAlert content="Are you sure  want to delete ?" onDelete={()=>deleteIncome(openDeleteAlert.data)} setOpenDeleteAlert={setOpenDeleteAlert}/>
          </Modal>
        </div>
        

      </div>
    </Dashboard>
  )
}

export default Income