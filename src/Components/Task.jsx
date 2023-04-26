import React, { useEffect, useRef } from 'react'

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
        const inputRef = useRef(null);
        //------------------------------------------
        //----------------- HOOKS ------------------
        //------------------------------------------
    
        //------------------------------------------
        //--------------- FUNCTIONS ----------------
        //------------------------------------------
        function handlerChecked() {
            console.log(inputRef.current.checked);

        }
    
        //------------------------------------------
        //--------------- COMPONENT ----------------
        //------------------------------------------

    return (
        <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-wback border border-gray-300 dark:border-gray-700 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
            <div className="form-control">
                <input  ref={inputRef} type="checkbox"  className="checkbox checkbox-primary" onChange={handlerChecked} />
            </div>
            <div className="text-back dark:text-white font-extralight">{props.task.data.name}</div>
        </div>
    )
}

export default Task
