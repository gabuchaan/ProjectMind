import React from 'react'

const AsignedTask = () => {
    return (
        <div className='flex'>
            <div className='border rounded-md flex items-center justify-center w-40'>Ui mockups</div>
            <div className='ml-4'>asigned to -></div>
            <div className='border rounded-md flex items-center justify-center w-36 ml-4'>Micheal Gant</div>
            <div className='cursor-pointer bg-blue-400 text-white rounded-md w-20 items-center justify-center flex ml-4'>Done</div>
            <div className='cursor-pointer bg-red-400 text-white rounded-md w-20 items-center justify-center flex ml-4'>Delete</div>
        </div>
    )
}

export default AsignedTask
