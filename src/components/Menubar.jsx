import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { LogOut, Menu, SidebarIcon, User, X } from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Menubar = ({activeMenu}) => {

    const [openSideMenu,setOpenSideMenu] = useState(false);
    const [showDropdown,setShowDropdown] = useState(false);

    const dropDownRef = useRef(null);

    const navigate = useNavigate();

    const {user,clearUser} = useContext(AppContext);

    const handleDropdownToggle = (event)=>{
            
            setShowDropdown(!showDropdown);
    }

    const handleLogout = (event) => {
         
         localStorage.clear();
         setShowDropdown(false);
         clearUser();
         navigate("/login");
    }

    useEffect(()=>{
        const handleClickOutside = (event)=> {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropdown(false);
            }
        }

        if(showDropdown){
            document.addEventListener("mousedown",handleClickOutside);
        }

        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    })

  return (
    <div className='flex items-center-safe justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-5 shadow-sm sm:px-7 sticky top-0 z-30'>
        {/*Left side - Menu button and title*/}
          <div className='flex items-center-safe gap-5'>
            <button onClick={()=>setOpenSideMenu(!openSideMenu)} className='block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors'>
                {openSideMenu ? (
                    <X className='text-2xl'/>
                ) : (<Menu className='text-2xl'/>) }
            </button>
            <div onClick={()=>navigate("/dashboard")} className='flex items-center-safe gap-4'>
                <img src={assets?.logo} className='h-10 w-10' alt="" />
                <span className='text-lg font-medium text-black truncate'>Money Manager</span>
            </div>
          </div>
        {/*Right side - Avatar photo */}
        <div className='relative' ref={dropDownRef}>
            <div className='flex flex-row items-center-safe gap-5'>
                {/* {
                    !user ? (<button onClick={()=>navigate("/signup")} className='px-10 py-2 text-[16px] font-light  text-purple-700 hover:bg-purple-700 bg-transparent outline outline-purple-400 hover:border-purple-700 hover:text-white rounded-lg'>sign up</button>) : ""
                }
                {
                    !user ? (<button className='px-10 py-2 text-md font-semibold text-white hover:bg-purple-500 bg-purple-700 rounded-lg' onClick={()=>navigate("/login")}>Login</button>) : ""
                } */}
            <button className='flex items-center-safe justify-center-safe w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2'
            onClick={handleDropdownToggle}>
               {user ? <img src={user?.imageUrl} className='w-10 h-10 object-cover rounded-full'></img> : <User className='w-4 h-4 text-purple-600'/>}
            </button>
            </div>
            {/*dropdown menu*/}
            {showDropdown && (<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
                {/*user info*/}
                <div className='px-4 py-2 border-b border-gray-100'>
                    <div className='flex items-center-safe gap-3'>
                        <div className='flex items-center-safe justify-center-safe w-8 h-8 bg-gray-100 rounded-full'>
                            {user ? <img src={user?.imageUrl} className='w-6 h-6 object-cover rounded-full'></img> : <User className='w-4 h-4 text-purple-600'/>}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-800 truncate'>{user?.fullName}</p>
                            <p className='text-sm text-gray-500 truncate'>{user?.email}</p>
                        </div>
                    </div>
                </div>
                {/*dropdown options*/}
                <div className='py-1'>
                    <button className='flex items-center-safe gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150' onClick={handleLogout}>
                        <LogOut className='w-4 h-4 text-gray-500'/>
                        <span>Logout</span>
                    </button>
                </div>
            </div>)}
        </div>

        {/*Mobile side menu*/}
        {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                    <Sidebar activeMenu={activeMenu}/>
                </div>
            )}
        
     </div>
  )
}

export default Menubar