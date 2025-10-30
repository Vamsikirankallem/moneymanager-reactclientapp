import React, { useContext } from 'react'
import Menubar from './Menubar'
import { AppContext } from '../context/AppContext'
import Sidebar from './Sidebar';
import { useUser } from '../hooks/useUser';



const Dashboard = ({children,activeMenu}) => {



 const {user,setUser,clearUser} = useContext(AppContext);

  return (
    <div>
        <Menubar activeMenu={activeMenu}/>
        {
          user && (<div className='flex'>
            <div className='max-[1080px]:hidden'>
                {/*side bar content*/}
             
                <Sidebar activeMenu={activeMenu}/>
            </div>

            <div className='grow mx-5'>{children}</div>
            </div>)
        }
    </div>
  )
}

export default Dashboard