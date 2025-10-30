import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../components/Input';
import { validateEmail } from '../util/Validation';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Login = () => {

   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [error,setError] = useState(null);
   const [isLoading,setIsLoading] = useState(false);

  const {user,setUser} = useContext(AppContext);

   const navigate = useNavigate();

   const handleSubmit = async(event)=> {
    event.preventDefault();
    setIsLoading(true);
    //basic validation
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if(!password.trim()){
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    

    //login validation

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
        email,password
      });

      const {token,user} = response?.data;
      if(token){
        localStorage.setItem("token",token);
        setUser(user);
        setEmail("");
        setPassword("");
        toast.success("login successful");
        navigate("/dashboard");

      }

      
    } catch (error) {
      if(error.response && error?.response?.data?.message){
        setError(error?.response?.data?.message);
      }
      toast.error("login failed");
    }
    finally{
     setIsLoading(false);
    }
  }

  return (
    <>
       <div className="h-screen w-full relative flex justify-center-safe items-center-safe overflow-hidden">
            <img src={assets.login_bg} alt="background" className='absolute inset-0 w-full h-full object-cover filter blur-xs' />
            <div className='relative z-10 w-full max-w-lg px-6'>
              <div className='bg-white opactiy-95 backdrop-blur-sm rounded-lg p-8 max-h-[90vh] overflow-y-auto'>
                <h3 className='text-2xl font-semibold text-black text-center mb-2'>
                   Welcome back
                </h3>
                <p className='text-sm text-slate-700 text-center mb-8'>Please enter your details to login.</p>
                <form onSubmit={handleSubmit}  className='space-y-4'>
                  <div className='flex justify-center-safe mb-6'>
                    <div className='flex flex-col w-full'>
                     
      
                     <div>
                       <Input value={email}
                      onChange={(event)=>setEmail(event.target.value)}
                      label="Email"
                      type="email"
                      placeholder="username@domain"
                      />
                     </div>
      
                      <div className='col-span-2'>
                        <Input
                      value={password}
                      onChange={(event)=>setPassword(event.target.value)}
                      label="Password"
                      type="password"
                      placeholder=" ************"/>
                      </div>
                    </div>
                   
                  </div>
                   {
                      error && (<p className='text-red-800 text-sm text-center bg-red-100 p-2 rounded-md'>{error}</p>) 
                    }
      
                    <button disabled={isLoading} className={`bg-purple-700 hover:bg-purple-800 rounded-lg text-white w-full py-3 text-lg font-medium flex items-center-safe justify-center-safe gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">{isLoading ? <><LoaderCircle className='animate-spin w-5 h-5'/> Logining in...</>: "LOGIN"}</button>
                    <p className='text-sm text-slate-800 text-center mt-6'>Don't have an account?<Link to="/signup" className='underline hover:text-blue-400 ml-1 text-md'>Signup</Link></p>
                </form>
              </div>
            </div>
          </div>
    </>
  )
}

export default Login