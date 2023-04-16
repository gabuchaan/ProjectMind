import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [screenShareStream, setScreenShareStream] = useState(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);


    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;

                }
            })
        socket.on("me", (id) => setMe(id))

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log('recibiendo llamada de' + callerName);
            setCall({ isRecivingCall: true, from, callerName, signal });
        })

    }, []);

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        console.log("Peer creado: ", peer);
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
            console.log("Evento 'signal' recibido.");
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log("Evento 'stream' recibido.");
        })

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = (id) => {
        console.log('llamada a ' + id);
        const peer = new Peer({ initiator: true, trickle: false, stream });
        console.log("Peer creado: ", peer);

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
            console.log('se emite call user');
        })
        {/**/ }
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log('currentStream');
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            console.log("Evento 'callaccepted' recibido.");
            peer.signal(signal);
        })
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    const toggleCamera = () => {
        setIsCameraOn(!isCameraOn);
        stream.getVideoTracks()[0].enabled = !isCameraOn;
    };
    
    const toggleMicrophone = () => {
        setIsMicrophoneOn(!isMicrophoneOn);
        stream.getAudioTracks()[0].enabled = !isMicrophoneOn;
    };

    return (
        <SocketContext.Provider value={{call,callAccepted,myVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall,toggleCamera,toggleMicrophone}} >
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };