import React from 'react'
import ProjectPfpName from './Project-PfpName';
import TaskManagement from './TaskManagement';
import Members from './Members';
import { useRef } from 'react';

/**
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * member={member}
 * tasks={tasks}
 * @returns 
 */
const EditProject = (props) => {

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
        <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
            <div className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">

                <ProjectPfpName
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                />

                <TaskManagement
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                    tasks={props.tasks}
                />

                <Members
                    project={props.project}
                    projectId={props.projectId}
                    authUser={props.authUser}
                    user={props.user}
                    userId={props.userId}
                    member={props.member}
                />
            </div>
        </div>
    )
}

export default EditProject
