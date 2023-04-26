import React, { useState, useEffect } from 'react'
import { AiOutlineBell } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import ProjectIcon from "./ProjectIcon";
import InvitationNotification from '../Components/InvitationNotification';
import { checkIfNotEmpty } from '../Js/common';
import { createProject } from '../Js/project';

const Sidebar = (props) => {

    console.log(props);
    const Swal = require('sweetalert2')
    const [darkMode, setDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleClick3 = () => {
        if (props.invitation.length != 0) setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    async function createProjectForm() {
        const { value: formValues } = await Swal.fire({
            title: 'Create Project',
            html:
                '<input id="projectName" className="swal2-input" placeholder="Project name">',
            focusConfirm: false,
            preConfirm: () => {
                const projectName = document.getElementById('projectName').value;
                if (!checkIfNotEmpty(projectName)) return "Tienes que poner un nombre";
                console.log("hola");
                createProject(props.userId, projectName);

                return projectName;
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues));
        }
    }

    const toggleMenu = (menuId) => {
        const menuMain = document.getElementById("menu-main");
        const menuProfile = document.getElementById("menu-profile");

        if (menuId === "menu-main") {
            menuMain.classList.remove("hidden");
            menuProfile.classList.add("hidden");
        } else if (menuId === "menu-profile") {
            menuMain.classList.add("hidden");
            menuProfile.classList.remove("hidden");
        }
    };

    return (
        <div>
            <div className="bg-white dark:bg-bars justify-center items-center side-menu  top-0 left-0 fixed w-16 h-screen flex flex-col  shadow-lg">
                {/*NOTIFICATION BUTTON*/}
                <AiOutlineBell onClick={handleClick3} size={27} className="text-gray-400 hover:text-gray-500 dark:hover:text-white hover:scale-105 cursor-pointer transition-all fixed top-20" />
                <button className='fixed bottom-24'>
                    <label className="swap swap-rotate scale-75" >
                        <input type="checkbox" />
                        <svg onClick={() => setDarkMode(!darkMode)} className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg onClick={() => setDarkMode(!darkMode)} className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                </button>


                {/*NOTIFICATION DIV (HIDDEN)*/}
                {showNotifications && (
                    <>
                        <div className="absolute left-16 w-screen h-screen z-40 bg-black opacity-50 transition-all"></div>
                        <div className="absolute bg-gray-300 dark:bg-gray-700 z-50 w-80 h-auto top-20 left-20 rounded-lg p-3 space-y-2 ">
                            {/*NOTIFICATION POPUP*/}

                            {
                                props.invitation.map((project) => {
                                    return (
                                        <InvitationNotification
                                            project={props.invitation}
                                            userId={props.userId}
                                        />
                                    )
                                })
                            }
                        </div></>)}

                <div className="justify-center items-center flex flex-col space-y-3 overflow-x-hidden scrollbar-hide  h-2/4">
                    {props.projects.map((project, index) => {
                        return (
                            <ProjectIcon
                                project={project}
                                onClick={props.onClick}
                                key={index}
                            />
                        )
                    })
                    }
                </div>
                <div className="bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500 justify-center mt-4 items-center flex text-white" onClick={createProjectForm}> <BsPlusCircle size={22} /> </div>

                <div onClick={() => toggleMenu("menu-profile")} className="cursor-pointer fixed bottom-4  bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500 justify-center items-center flex text-white" >
                    {/* <AiOutlineUser size={22}/> */}
                    <img src={props.user.avatar} alt="" />
                </div>

            </div>
        </div>
    )
}

export default Sidebar;
