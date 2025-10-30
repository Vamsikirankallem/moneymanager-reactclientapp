import { Trash, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({image,setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl,setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
           event.preventDefault();
        const file = event.target.files[0];

        if(file){
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const hadleRemoveImage = (event) => {
        event.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFileExplorer = (event) => {
        event.preventDefault();
        inputRef.current?.click();
    }

  return (
    <div className='flex justify-center-safe mb-6'>
        <input type="file" 
        className='hidden' 
        ref={inputRef} 
        accept='image/*'
        onChange={handleImageChange} />
        {!image ? (<div className='w-20 h-20 flex items-center-safe justify-center-safe bg-purple-100 rounded-full relative'>
            <User className='text-purple-500' size={35}/>

            <button className='w-8 h-8 flex items-center-safe justify-center-safe text-purple-800 rounded-full absolute -bottom-1 -right-1' onClick={onChooseFileExplorer}><Upload size={15}/></button>
        </div>) : (<div className='w-20 h-20 flex items-center-safe justify-center-safe bg-purple-100 rounded-full relative'>
            <img src={previewUrl} alt="" className='w-20 h-20 rounded-full object-cover' />
           <button className='w-8 h-8 flex items-center-safe justify-center-safe bg-red-100 text-red-500 rounded-full absolute -bottom-1 -right-1'><Trash size={15} onClick={hadleRemoveImage}/></button>
        </div>)}
    </div>
  )
}

export default ProfilePhotoSelector