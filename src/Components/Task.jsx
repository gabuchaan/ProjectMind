import React from 'react'

/**
 * 
 * @param {
 * task={task}
 * } props 
 * @returns 
 */
const Task = (props) => {
    console.log(props);
    
        //------------------------------------------
        //--------------- VARIABLES ----------------
        //------------------------------------------
    
        //------------------------------------------
        //----------------- HOOKS ------------------
        //------------------------------------------
    
        //------------------------------------------
        //--------------- FUNCTIONS ----------------
        //------------------------------------------
    
        //------------------------------------------
        //--------------- COMPONENT ----------------
        //------------------------------------------

    return (
        <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-wback border border-blue-400 dark:border-blue-800 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
            <div className="form-control">
                <input type="checkbox"  className="checkbox checkbox-primary" />
            </div>
            <div className="text-back dark:text-white font-extralight">{props.task.name}</div>
        </div>
    )
}

export default Task
