import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Income from './pages/Income'
import Expense from './pages/Expense'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <>
    <Toaster/>
     <Routes>
      <Route path='/' Component={Root} />
      <Route path='/home' element={<LandingPage/>}/>
       <Route path='/dashboard' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/category' element={<Category/>}/>
       <Route path='/filter' element={<Filter/>}/>
       <Route path='/income' element={<Income/>}/>
       <Route path='/expense' element={<Expense/>}/>
     </Routes>
    </>
  )
}

const Root = ()=> {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (<Navigate to="/home"></Navigate>)
}

export default App