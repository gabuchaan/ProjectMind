import React from 'react'
import ProjectPfpName from './Project-PfpName';
import TaskManagement from './TaskManagement';
import Members from './Members';
const EditProject = () => {
    return (
        <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
            <div className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">

               <ProjectPfpName />

                <TaskManagement />

                
                <Members />

            </div>


        </div>
    )
}

export default EditProject
