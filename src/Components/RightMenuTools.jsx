import React from 'react'
import ToolsMenu from './ToolsMenu'

const RightMenuTools = () => {
    return (
        <>
           <ToolsMenu />
            <div className="w-full h-auto pt-5 bg-white shadow-lg mt-4 dark:bg-boxes rounded-md flex flex-col justify-center items-center p-3">
                <div className='bg-blue-100 rounded-md w-72 h-auto flex flex-col items-center justify-center pt-5 pb-5'>
                    <div className='bg-black w-44 h-44 rounded-md'></div>
                    <div className='mt-4 text-black font-medium text-lg'>Random color</div>
                    <div id='colorNumber' className='text-gray-700'>rgb(123, 456, 255)</div>
                    <div  className='bg-blue-400 mt-4 text-white rounded-xl w-28 h-8 flex items-center justify-center'>New color</div>
                </div>
            </div>
            
        </>
    )
}

export default RightMenuTools
