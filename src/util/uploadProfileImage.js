import toast from "react-hot-toast";
import { API_ENDPOINTS } from "./apiEndpoints";


const CLOUDINARY_IMAGE_PRESET = "moneymanager";

export const uploadProfileImage = async(image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset",CLOUDINARY_IMAGE_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE,{
        method : "POST",
        body : formData
    });

    if(!response?.ok){
        const errorData = await response.json();
        throw new error(`Cloudinary upload failed ${errorData.error.message || response?.statusText}`);
        
    }

    const data = await response.json();
    console.log(data.secure_url);
    return data?.secure_url;
    } catch (error) {
        toast.error("Profile image upload failed");
    }
}
