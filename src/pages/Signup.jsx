import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../components/Input';
import { validateEmail } from '../util/Validation';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import { uploadProfileImage } from '../util/uploadProfileImage';

const Signup = () => {

  const [fullName,setFullName]  =useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [profilePhoto,setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(event)=> {

    let imageUrl = "";
    event.preventDefault();
    setIsLoading(true);
    //basic validation
    if(!fullName.trim()){
      setError("Please enter your fullname");
      setIsLoading(false);
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if(!password.trim()){
      setError("Please enter your  password");
      setIsLoading(false);
      return;
    }

    
    setError("");
    

    //signup api call
    try {
      if(profilePhoto){
        const profileImageUrl = await uploadProfileImage(profilePhoto);
        imageUrl=profileImageUrl;
        console.log(imageUrl);
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
        fullName,
        email,
        password,
        imageUrl
      })
      if(response.status===201){
        toast.success("Profile created successfully");
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/login")
      }
    } catch (error) {
      toast.error("Profile creation failed");
    }
    finally{
      setIsLoading(false);
    }
    console.log(imageUrl);
  }

  return (
    <div className="h-screen w-full relative flex justify-center-safe items-center-safe overflow-hidden">
      <img src={assets.login_bg} alt="background" className='absolute inset-0 w-full h-full object-cover filter blur-xs' />
      <div className='relative z-10 w-full max-w-lg px-6'>
        <div className='bg-white opactiy-95 backdrop-blur-sm rounded-lg p-8 max-h-[90vh] overflow-y-auto'>
          <h3 className='text-2xl font-semibold text-black text-center mb-2'>
             Create an account
          </h3>
          <p className='text-sm text-slate-700 text-center mb-8'>Start tracking your spendings by joining with us.</p>
          <form onSubmit={handleSubmit}  className='space-y-4'>
            <div className='flex flex-col justify-center-safe mb-6'>
              <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input value={fullName} 
                placeholder="Enter your fullname" 
                onChange={(event)=>setFullName(event.target.value)} 
                label="Full Name" 
                type="text"/>

                <Input value={email} 
                onChange={(event)=>setEmail(event.target.value)}
                label="Email"
                type="email"
                placeholder="username@domain"
                />

                <div className='col-span-2'>
                  <Input
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                label="Password"
                type="password"
                className="text-purple-800"
                placeholder=" ************"/>
                </div>
              </div>
             
            </div>
             {
                error && (<p className='text-red-800 text-sm text-center bg-red-100 p-2 rounded-md'>{error}</p>) 
              }

              <button disabled={isLoading} className={`bg-purple-700 hover:bg-purple-800 rounded-lg text-white w-full py-3 text-lg font-medium flex items-center-safe justify-center-safe gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">{
  isLoading  ? <>
  <LoaderCircle className='animate-spin w-5 h-5' />
  Signing Up...
  </> : "SIGN UP"
}</button>
              <p className='text-sm text-slate-800 text-center mt-6'>Already have an account?<Link to="/login" className='underline hover:text-blue-400 ml-1 text-md'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup