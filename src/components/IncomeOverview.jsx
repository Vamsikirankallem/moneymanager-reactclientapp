import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/util';
import CustomLineChart from './CustomLineChart';

const IncomeOverview = ({incomeData}) => {
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareIncomeLineChartData(incomeData);
        setChartData(result);
        console.log(result);

        return ()=>{

        }
    },[incomeData])
  return (
    <div className=' shadow-md shadow-purple-100 p-4 rounded-lg'>
        <div className='flex flex-col items-start-safe'>
            <div>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-sx text-gray-400 mt-0 5'>
                    Track your earnings over time and analyze your income trends.
                </p>
            </div>
            <div className='mt-10 w-full'>
                {/*create a line chart */}
               
                <CustomLineChart data={chartData}/>
            </div>
        </div>
    </div>
  )
}

export default IncomeOverview