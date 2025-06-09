import React from 'react'
 import CatagoryList from '../component/CatagoryList';
 import Carsole from '../component/Carsole';
import SingleCatagoryProduct from '../component/SingleCatagoryProduct';
import SingleCatagoryProductVertical from '../component/SingleCatagoryProductVertical';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../App';
import { toast } from 'react-toastify';
 
function Home() {
   const { AuthUserDetail, fetchAddCartCount } = useContext(Context);

  useEffect(() => {
    const runAfterGoogleLogin = async () => {
      const hasToken = document.cookie.split(';').some(cookie => cookie.trim().startsWith('jwt='));
      if (hasToken) {
        try {
          await AuthUserDetail();
          await fetchAddCartCount();
          toast.success("Login successful via Google!");
        } catch (e) {
          console.error("Google login post-action failed:", e);
        }
      }
    };

    runAfterGoogleLogin();
  }, []);

  return (
    <div className='mt-[14vw] md:mt-[8vw] xl:mt-[7vw] px-4'>
      <CatagoryList/>
 
 <Carsole/> 
 <SingleCatagoryProduct Title={"Top's Mobile Brand"} catagory={'mobiles'}   />  
 <SingleCatagoryProduct Title={"Top's processor Brand"} catagory={'processor'}   />  
 <SingleCatagoryProduct Title={"Top's earphones Brand"} catagory={'earphones'}   />  
 {/* /varticals product */}
 <SingleCatagoryProductVertical Title={"Top's Mobile Brand"} catagory={'mobiles'}   />  
 <SingleCatagoryProductVertical Title={"Top's Processor Brand"} catagory={'processor'}   />  

     </div>
  ) 

}

export default Home
