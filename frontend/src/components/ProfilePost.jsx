import React from 'react'
import { IF } from '../url'
import { Link } from 'react-router-dom';
const ProfilePost = ({p}) => {
  return (
  
  
    <div className='w-full flex mt-8 space-x-4 flex-col md:flex-row'>
    {/* left */}
    <div className="w-[100%]  md:w-[35%] h-[300px] flex justify-center items-center">
    
        <img src={IF+p.photo} alt="" className='h-full w-full object-cover' />
    
    </div>


    {/* right */}
    <div className="flex flex-col md:w-[65%] w-[100%]">
        <h1 className='text-2xl font-bold md:mb-2 mb-1 md:text-2xl mt-2'>
           
           {p?.title}
        </h1>
        <div className="flex mb-2 text-xl font-semibold text-green-500 space-x-4 md:mb-4 items-center justify-between ">
            <p>@{p?.username}</p>
            <div className="flex space-x-2">
            <p>  {new Date(p?.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(p?.updatedAt).toString().slice(15,21)}</p>
            </div>

        </div>
        <p className='text-lg md:text-lg'>
        {p?.desc?.slice(0,200)}
        <span className='text-green-500 font-bold'>......Read more</span>
        </p>
    </div>



</div>
   
   
  )
}

export default ProfilePost
