
import React from 'react';
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";


const EditProject = () => {
  return (
    <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        <div className="box border border-gray-300 dark:border-bars bg-white dark:bg-bars h-44 flex justify-start flex-row items-center px-5 rounded-md">
          <div>
            <img className="ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full  w-32" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" />
          </div>
          <div className='ml-7 flex flex-col space-y-3'>
            <input placeholder='ProjectName' type="text" className='bg-gray-700 rounded-md w-60 h-10 text-white pl-3' />
            <input placeholder='ProjectName' type="text" className='bg-gray-700 rounded-md w-60 h-10 text-white pl-3' />
          </div>

          <div className="flex flex-row ml-auto text-gray-400 space-x-3">

            
          </div>
        </div>
       
        {/*MESSAGES----------------*/}
        <div className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">
          

        </div>


        <div className="bg-white dark:bg-bars h-16 chat-input box border-gray-300 dark:border-bars rounded-md border flex items-center pl-2 pr-2 py-4 ">
         
        </div>
      </div>
  )
}

export default EditProject
