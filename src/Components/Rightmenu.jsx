import React from 'react'
import Task from './Task';
import Task2 from './Task2';
import MemberCard from './MemberCard'
import SharedFile from './SharedFile';

/**
 * 
 * @param {
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * tasks={tasks}
 * } props 
 * @returns 
 */
const Rightmenu = (props) => {

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
        <>
            <div className='w-full h-16 rounded-md bg-white dark:bg-boxes flex items-center'>
                <input className='pl-3 text-black dark:text-white rounded-md bg-wback dark:bg-bars border ml-3 w-72 h-8' type="text" />
                <div className='cursor-pointer bg-blue-400 text-white rounded-md pl-2 pr-2 h-8 flex items-center ml-4'>Create task</div>
            </div>
            <div className="w-full h-auto pt-5 bg-white shadow-lg mt-4 dark:bg-boxes rounded-md flex flex-col justify-center items-center p-3">
                <div className="text-back dark:text-white font-monserrat text-lg font-semibold">Tasks</div>
                <div className="h-72 scrollbar-hide overflow-x-hidden w-full mt-3 space-y-1 overflow-y-auto">
                    <Task2 />
                    {
                        props.tasks.map((task, index) => {
                            return <Task 
                                task={task}
                                projectId={props.projectId}
                                key={index}
                            />
                        })
                    }
                </div>
            </div>
            <div className="w-full h-auto p-3 bg-white shadow-lg dark:bg-boxes rounded-md mt-3 flex flex-col items-center">
                <div className="text-back dark:text-white font-semibold text-lg">Members</div>
                <div className="w-96 overflow-x-scroll scrollbar-hide h-auto flex gap-2 mt-3">
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                </div>
            </div>
            <div className="w-full h-auto bg-white shadow-lg dark:bg-boxes rounded-md mt-3 flex flex-col items-center p-5">
                <div className="text-back dark:text-white font-semibold text-lg">Shared files</div>
                <div className="mt-3 w-full h-auto">
                    <SharedFile />
                </div>

            </div>
        </>
    )
}

export default Rightmenu
