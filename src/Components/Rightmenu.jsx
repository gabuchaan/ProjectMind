import React from 'react'
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const Rightmenu = () => {
    return (
        <>
            <div className="w-full h-auto pt-5 bg-white shadow-lg dark:bg-boxes rounded-md flex flex-col justify-center items-center p-3">
                <div className="text-back dark:text-white font-monserrat text-lg font-semibold">Tasks</div>
                <div className="h-auto w-full mt-3 space-y-1">
                    <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-300 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
                        <div className="form-control">
                            <input type="checkbox" checked className="checkbox checkbox-primary" />
                        </div>
                        <div className="text-back dark:text-white font-extralight"> Get mockups</div>
                    </div>
                    <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-300 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
                        <input type="checkbox" checked className="checkbox checkbox-primary" />
                        <div className="text-back dark:text-white font-extralight"> Send devlopment info</div>
                    </div>
                    <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-300 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
                        <input type="checkbox" checked className="checkbox checkbox-primary" />
                        <div className="text-back dark:text-white font-extralight"> Solve bugs</div>
                    </div>
                    <div className="transition-all hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-300 dark:bg-bars w-full h-12 rounded-md flex flex-row items-center pl-3 pr-3 space-x-3">
                        <input type="checkbox" className="checkbox" disabled />
                        <div className="text-back dark:text-white font-extralight"> Meeting</div>
                    </div>

                </div>

            </div>
            <div className='w-full h-12 bg-white dark:bg-boxes mt-3 rounded-md shadow-lg'>
                <div className='items-center justify-center flex mt-3 ml-6 bg-blue-400 w-40 text-white rounded-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all'>Create task</div>
            </div>


            <div className="w-full h-auto p-3 bg-white shadow-lg dark:bg-boxes rounded-md mt-3 flex flex-col items-center">
                <div className="text-back dark:text-white font-semibold text-lg">Members</div>
                <div className="w-full h-auto flex gap-2 mt-3">
                    <div className="flex flex-col items-center p-3 w-24 h-28 bg-gray-300 dark:bg-bars rounded-md space-y-1 hover:scale-105 hover:shadow-xl  transition-all">
                        <img className="ring-2 ring-green-500 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/10.webp" />
                        <div className="font-extralight font-monserrat text-back dark:text-white">Rebeca</div>
                    </div>
                    <div className="flex flex-col items-center p-3 w-24 h-28 bg-gray-300 dark:bg-bars rounded-md space-y-1 hover:scale-105 hover:shadow-xl  transition-all">
                        <img className="ring-2 ring-gray-600 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" />
                        <div className="font-extralight font-monserrat text-back dark:text-white">Carlos</div>
                    </div>
                    <div className="flex flex-col items-center p-3 w-24 h-28 bg-gray-300 dark:bg-bars rounded-md space-y-1 hover:scale-105 hover:shadow-xl  transition-all">
                        <img className="ring-2 ring-green-500 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" />
                        <div className="font-extralight font-monserrat text-back dark:text-white">Mack</div>
                    </div>
                    <div className="flex flex-col items-center p-3 w-24 h-28 bg-gray-300 dark:bg-bars rounded-md space-y-1 hover:scale-105 hover:shadow-xl  transition-all">
                        <img className="ring-2 ring-red-500 border-4 border-transparent rounded-full w-16" src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                        <div className="font-extralight font-monserrat text-back dark:text-white">Karl</div>
                    </div>
                </div>
            </div>


                <div className="w-full h-auto bg-white shadow-lg dark:bg-boxes rounded-md mt-3 flex flex-col items-center p-5">
                    <div className="text-back dark:text-white font-semibold text-lg">Shared files</div>
                    <div className="mt-3 w-full h-auto">
                        <div className="w-full h-16 bg-gray-300 dark:bg-bars rounded-md flex flex-row pl-3 items-center text-back dark:text-gray-300 hover:shadow-2xl hover:scale-105 transition-all">
                            <BsFileEarmarkPdfFill size={38} />
                            <div className="flex flex-col ml-3">
                                <div className="font-medium">SmartContract</div>
                                <div className="text-sm">Type: PDF</div>
                            </div>

                        </div>
                    </div>

                </div>

            
        </>
    )
}

export default Rightmenu
