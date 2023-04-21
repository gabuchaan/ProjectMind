import React, { useState, useContext } from 'react'
import VideoPlayer from '../Components/VideoPlayer'
import Options from '../Components/Options'
import Notifications from '../Components/Notifications'
import ChatCall from '../Components/ChatCall'
import Topbar from '../Components/Topbar'
import Sidebar from '../Components/Sidebar'
import { AiOutlineSend, AiOutlineUserAdd, AiOutlineBell } from "react-icons/ai";
import { BsCamera, BsMic, BsEmojiSmile, BsFileEarmarkPdfFill, BsCloudArrowUp, BsFillMicFill, BsFillMicMuteFill, BsMicFill, BsScrewdriver } from "react-icons/bs";
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { saveAs } from 'file-saver';

import { SocketContext } from '../Js/SocketContext'

const Calls = () => {

    const [texto, setTexto] = useState(''); // Agregamos un estado para el valor del textarea
    const { leaveCall } = useContext(SocketContext)


    const { stream } = useContext(SocketContext);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [showCameraIcon, setShowCameraIcon] = useState(true);

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn);
        stream.getVideoTracks()[0].enabled = !isCameraOn;
        setShowCameraIcon(!showCameraIcon);
    };


    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [showMicIcon, setShowMicIcon] = useState(true);

    const toggleMicrophone = () => {
        setIsMicrophoneOn(!isMicrophoneOn);
        stream.getAudioTracks()[0].enabled = !isMicrophoneOn;
        setShowMicIcon(!showMicIcon);
    };

    const guardarArchivo = () => {
        const textoParaGuardar = texto; // Obtenemos el valor actual del textarea
        const blob = new Blob([textoParaGuardar], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'mi_texto.txt');
    }

    const handleTextoChange = (event) => {
        setTexto(event.target.value); // Actualizamos el valor del textarea cuando el usuario escribe
    }

    const [isScreenSharing, setIsScreenSharing] = useState(false);
    {/*const handleShareScreen = () => {
        if (!isScreenSharing) {
            navigator.mediaDevices.getDisplayMedia({ cursor: true })
                .then((stream) => {
                    const screenTrack = stream.getTracks()[0];
                    setIsScreenSharing(true);
                    screenTrack.onended = () => {
                        setIsScreenSharing(false);
                    };
                    const videoTrack = stream.getVideoTracks()[0];
                    videoTrack.onended = () => {
                        setIsScreenSharing(false);
                    };
                    const sender = peerConnection.addTrack(videoTrack, stream);
                    setScreenSender(sender);
                })
                .catch((err) => {
                    console.error('Error al compartir pantalla: ', err);
                    setIsScreenSharing(false);
                });
        } else {
            screenSender?.replaceTrack(null);
            setIsScreenSharing(false);
        }
    };*/ }



    return (
        <div className="bg-wback dark:bg-back">
            <Topbar />
            <div className="bg-white dark:bg-bars justify-center items-center side-menu  top-0 left-0 fixed w-16 h-screen flex flex-col  shadow-lg">
            </div>
            {/*MAIN CONTAINER*/}

            <div className="md:pl-16 pt-16">
                <div className="bg-wback dark:bg-back -mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
                    {/*SIDE MENU-------------------*/}

                    <div className=" side-content col-span-12 xl:col-span-2 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden">
                        <div className='bg-bars w-full h-2/3 rounded-md flex flex-col p-4'>
                            <div className='flex'>
                                <div className='text-gray-200 text-2xl font-semibold'>Notes</div>
                                <div className='w-20 ml-20 bg-green-500 text-white font-semibold rounded-md flex justify-center items-center cursor-pointer hover:scale-105 transition-all hover:shadow-2xl' onClick={guardarArchivo}>Get note</div>
                            </div>
                            <textarea value={texto} onChange={handleTextoChange} type="text" className='w-full h-full rounded-md mt-2 bg-gray-700 text-white' />
                        </div>
                        <Options />
                        <Notifications />
                    </div>
                    {/*CHAT----------------------------*/}
                    <div className=" chat-box border-gray-300 dark:border-boxes col-span-15 xl:col-span-7 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
                        <div className="text-gray-200 box border border-gray-300 dark:border-bars bg-white dark:bg-bars h-16 flex justify-start flex-row items-center px-5 rounded-md text-2xl font-medium">
                            Meeting
                        </div>
                        <div className="pt-5 flex-1 float-left">
                            <VideoPlayer />
                        </div>
                        <div className="bg-white dark:bg-bars h-16 chat-input box space-x-3 border-gray-300 dark:border-bars rounded-md border flex items-center pl-2 pr-2 py-4 ">
                            <div onClick={toggleCamera} className='w-12 h-12 rounded-md bg-blue-400 text-gray-200 hover:text-white hover:bg-blue-500 transition-all flex items-center justify-center cursor-pointer'>
                                {showCameraIcon ? (
                                    <HiVideoCamera size={32} />
                                ) : (
                                    <HiVideoCameraSlash size={32} />
                                )}
                            </div>
                            <div onClick={toggleMicrophone} className='w-12 h-12 rounded-md bg-blue-400 text-gray-200 hover:text-white hover:bg-blue-500 transition-all flex items-center justify-center cursor-pointer'>
                                {showMicIcon ? (
                                    <BsMicFill size={28} />
                                ) : (
                                    <BsFillMicMuteFill size={28} />
                                )}
                            </div>
                            <div className='w-12 h-12 rounded-md bg-blue-400 text-gray-200 hover:text-white hover:bg-blue-500 transition-all flex items-center justify-center cursor-pointer'>


                                <MdScreenShare size={28} className="text-gray-200 hover:text-white cursor-pointer" />


                            </div>
                            <div onClick={leaveCall} className='w-40 h-12 rounded-md bg-red-400 text-gray-200 hover:text-white hover:bg-red-500 font-semibold transition-all flex items-center justify-center cursor-pointer'>
                                End meeting
                            </div>
                        </div>
                    </div>

                    {/*RIGHT MENU*/}

                    <div className=" info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6 pt-6 pb-5 ">
                        <div className='rounded-md bg-bars w-full h-full pt-3 pl-4 pr-4 flex flex-col col-span-3 pb-4'>
                            <div className='text-gray-200 font-medium text-2xl'>Chat</div>
                            <div className='bg-back w-full h-full rounded-md mb-4 mt-3 '></div>
                            <div className='bg-back w-full h-16 rounded-md flex items-center pr-2'>
                                <input className='text-white w-full h-full bg-transparent pl-4 pr-4' type="text" placeholder='Type something...' />
                                <AiOutlineSend size={23} className="text-gray-400 w-10 ml-3 hover:text-white cursor-pointer transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*MAIN CONTAINER END*/}
        </div>
    )
}

export default Calls
