import React, { useEffect } from 'react'
import { IF } from '../url'



const HomePost = ({post}) => {
   
  return (
    <div className='w-full flex mt-8 space-x-4 flex-col md:flex-row'>
        {/* left */}
        <div className="w-[100%] md:w-[40%] md:h-[250px] flex justify-center items-center h-[300px]">
            <img src={
               IF + post.photo} alt="" className='h-full w-full object-cover' />
        </div>


        {/* right */}
        <div className="flex flex-col md:w-[60%] w-[100%] ">
            <h1 className='text-xl font-bold md:mb-2 mb-1 md:text-2xl'>
             
             {post.title}
            </h1>
            <div className="flex mb-2 text-sm font-semibold text-green-500  md:mb-4 items-center justify-between">
                <p>@{post.username}</p>
                <div className="flex space-x-2">
 <p>  {new Date(post.updatedAt).toString().slice(0,15)}</p>
 <p>{new Date(post.updatedAt).toString().slice(15,21)}</p>
                </div>

            </div>
            <p className='text-sm md:text-lg'>
                {post?.desc?.slice(0,200)}
                <span className='text-green-500 font-bold'>......Read more</span>
                {/* {post.desc} */}
            </p>
        </div>

   
   
    </div>
  )
}

export default HomePost
