import React from 'react'

const Task = () => {
    return (
        <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-wback border border-gray-300 dark:border-gray-700 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
            <div className="form-control">
                <input type="checkbox" checked className="checkbox checkbox-primary" />
            </div>
            <div className="text-back dark:text-white font-extralight"> Get mockups</div>
        </div>
    )
}

export default Task
