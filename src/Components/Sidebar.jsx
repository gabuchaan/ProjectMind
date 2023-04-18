import React, { useState, useEffect } from 'react'
import { AiOutlineBell } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import ProjectIcon from "./ProjectIcon";
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";
import { checkIfNotEmpty } from '../Js/common';
import { getAuthUser, getUserFromAuth } from "../Js/user";
import { createProject, getAllProjects } from '../Js/project';
import { auth, db } from "../firebase.js";
import { log } from 'util';

const Sidebar = (props) => {

    console.log(props.user);
    const Swal = require('sweetalert2')
    const [darkMode, setDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleClick3 = () => {
        setShowNotifications(!showNotifications);
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
                '<input id="projectName" class="swal2-input" placeholder="Project name">',
            // + '<input id="ProjectDescription" class="swal2-input" placeholder="Project description">',
            focusConfirm: false,
            preConfirm: () => {
                const projectName = document.getElementById('projectName').value;
                if (!checkIfNotEmpty(projectName)) return "Tienes que poner un nombre";
                console.log(getAuthUser().multiFactor.user.uid);
                createProject(getAuthUser().multiFactor.user.uid, projectName);

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
                <div class='text-white fixed top-4  h-10'>LOGO</div>
                {/*NOTIFICATION BUTTON*/}
                <AiOutlineBell onClick={handleClick3} size={27} class="text-gray-400 hover:text-gray-500 dark:hover:text-white hover:scale-105 cursor-pointer transition-all fixed top-20" />
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
                        <div class="absolute left-16 w-screen h-screen z-40 bg-black opacity-50 transition-all"></div>
                        <div class="absolute bg-gray-300 dark:bg-gray-700 z-50 w-80 h-auto top-20 left-20 rounded-lg p-3 space-y-2 ">
                            {/*NOTIFICATION POPUP*/}
                            <div id="toast-message-cta" class="hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                <div class="flex">
                                    <img class="w-8 h-8 rounded-full shadow-lg" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="Jese Leos image" />
                                    <div class="ml-3 text-sm font-normal">
                                        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Max Jones</span>
                                        <div class="mb-2 text-sm font-normal">Hi , Join my project.</div>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">Accept</a>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-3">Decline</a>
                                    </div>
                                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div id="toast-message-cta" class="hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                <div class="flex">
                                    <img class="w-8 h-8 rounded-full shadow-lg" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" alt="Jese Leos image" />
                                    <div class="ml-3 text-sm font-normal">
                                        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Jese Leos</span>
                                        <div class="mb-2 text-sm font-normal">Hi Neil, thanks for sharing your thoughts regarding Flowbite.</div>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">Accept</a>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-3">Decline</a>
                                    </div>
                                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div id="toast-message-cta" class="hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                <div class="flex">
                                    <img class="w-8 h-8 rounded-full shadow-lg" src="https://tecdn.b-cdn.net/img/new/avatars/4.webp" alt="Jese Leos image" />
                                    <div class="ml-3 text-sm font-normal">
                                        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Gina Zane</span>
                                        <div class="mb-2 text-sm font-normal">How's it going? do u want to join our team?</div>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">Accept</a>
                                        <a href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-3">Decline</a>
                                    </div>
                                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div></>)}
                <div className="justify-center items-center flex flex-col space-y-3">
                    {props.projects.map((project) => {
                        return (
                            <ProjectIcon
                                avatar_image={project.data.image}
                            />
                        )
                    })
                    }
                    <div className="bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500 justify-center items-center flex text-white" onClick={createProjectForm}> <BsPlusCircle size={22} /> </div>
                </div>
                <div onClick={() => toggleMenu("menu-profile")} className="cursor-pointer fixed bottom-4  bg-gray-300 dark:bg-boxes w-12 h-12 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:bg-gray-500 justify-center items-center flex text-white" >
                    {/* <AiOutlineUser size={22}/> */}
                    <img src={props.user.avatar} alt="" />
                </div>

            </div>
        </div>
    )
}

export default Sidebar;
