import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'
import InfoCard from '../components/InfoCard';
import { Coins, IndianRupee, Wallet, Wallet2, WalletCards } from 'lucide-react';
import { addThousandsSeparator } from '../util/util';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverview from '../components/FinanceOverview';
import Transactions from '../components/Transactions';

const Home = () => {

 const navigate = useNavigate();
 const [dashboardData,setDashboardData] = useState(null);
 const [loading,setLoading] = useState(false);

 const fetchDashboardData = async()=> {
        
      setLoading(true);

      try {
        const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
        console.log(response?.data)
        if(response?.status===200){
          setDashboardData(response?.data);
          setLoading(false)
        }
      } catch (error) {
        toast.error("Failed to fetch dashboard data")
      }finally{
        setLoading(false);
      }
 }



 useEffect(()=>{
  fetchDashboardData();
  return ()=>{}
 },[])

  useUser();
  return (
    <div>
      <Dashboard activeMenu={"Dashboard"}>
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/*Display the cards */}
            <InfoCard icon={<WalletCards/>} label="Total Balance" value={addThousandsSeparator(dashboardData?.totalBalance)}
            color="bg-purple-800"/>

            <InfoCard icon={<Wallet/>} label="Total Income" value={addThousandsSeparator(dashboardData?.totalIncome)}
            color="bg-green-800"/>

            <InfoCard icon={<Coins/>} label="Total Expense" value={addThousandsSeparator(dashboardData?.totalExpense)}
            color="bg-red-800"/>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            {/*Recent transactions */}
            <RecentTransactions transactions={dashboardData?.recentTransactions} onMore={()=>navigate("/expense")}/>

            {/*Financial overview chart */}
            <FinanceOverview totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}/>

            {/*Expense transactions */}
            <Transactions transactions={dashboardData?.recent5Expenses || []}
            onMore={()=>navigate("/expense")}
            type="expense"
            title="Recent Expenses"/>

            {/*Income transactions */}
            <Transactions transactions={dashboardData?.recent5Incomes || []}
            onMore={()=>navigate("/income")}
            type="income"
            title="Recent Incomes"/>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home