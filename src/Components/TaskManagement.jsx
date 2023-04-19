import React from 'react'
import { TiArrowShuffle } from "react-icons/ti";
import AsignedTask from './AsignedTask';


const TaskManagement = () => {
  return (
    <div className='pl-7 w-full h-auto pb-7 bg-white border border-gray-300 dark:border-gray-700 dark:bg-bars mt-5 rounded-md'>
                    <div className='flex'>
                        <div className='mt-5 text-black dark:text-white text-lg font-medium'>Task management</div>
                        <TiArrowShuffle size={21} className="text-black dark:text-white mt-6 ml-3" />
                    </div>
                    <div className='flex mt-5'>
                        <div className='text-black dark:text-gray-300'>Asign</div>
                        <input className='ml-3 bg-transparent border rounded-md pl-3' type="text" placeholder='Task Name' />
                        <div className='ml-3 text-black dark:text-gray-300'>to</div>
                        <select className='ml-3 bg-transparent border rounded-md pl-3' type="text" placeholder='Member' >
                            <option value="">Max Jones</option>
                            <option value="">Jeni Lopez</option>
                            <option value="">Pol Mera</option>
                            <option value="">Elsa Polindo</option>
                        </select>
                        <div className='border cursor-pointer hover:scale-105 hover:shadow-lg transition-all bg-green-400 text-white rounded-md w-20 justify-center items-center flex ml-7'>Asign</div>
                    </div>
                    <div className='mt-5 text-white text-lg font-medium'>Created tasks</div>
                    <div className='mt-5 flex flex-col space-y-4'>
                       <AsignedTask />
                       <AsignedTask />
                       <AsignedTask />
                        
                    </div>
                </div>
  )
}

export default TaskManagement
