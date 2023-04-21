
import React, { useState, useEffect } from 'react';
import { AiOutlineSend, AiOutlineUserAdd, AiOutlineBell } from "react-icons/ai";
import { BsCamera, BsMic, BsEmojiSmile, BsFileEarmarkPdfFill, BsCloudArrowUp } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import { db } from "../firebase.js";
import MyMessage from './MyMessage';
import { Link, useNavigate } from "react-router-dom";
import { inviteUser } from "../Js/project";
import { log } from 'util';
import { collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';


/**
 * 
 * @param {*} props 
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * @returns 
 */
const ChatBox = (props) => {
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [mensajeInput, setMensajeInput] = useState("");

  useEffect(() => {

    if (props.projectId) {
      db.collection("messages").doc(props.projectId).collection("messages")
        .onSnapshot((snapShot) => {
          setMessages(snapShot.docs.map((doc) => doc.data()))
        });
    }
  }, [props.projectId]);

  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------

  /**
   * Funcion para invitar usuario al projecto
   */
  async function addUser() {
    const Swal = require('sweetalert2')
    //------DIRECCION CORREO-----------
    const { value: email } = await Swal.fire({
      title: 'Invite user',
      input: 'email',
      inputLabel: 'user email address',
      inputPlaceholder: 'Enter user email address'
    })

    //--ROL-----
    const { value: role } = await Swal.fire({
      title: 'Add user rol',
      input: 'select',
      inputOptions: {
        'Roles': {
          member: 'Member (general)',
          designer: 'Designer',
          developer: 'Developer',
          tester: 'Tester',
          prijectManager: 'Project manager',
        },
      },
      inputPlaceholder: 'Select a rol',
      showCancelButton: true,
    })

    if (email, role) {
      Swal.fire(`Entered email: ${email}\nYou selected: ${role}`);
      inviteUser(email, props.projectId);
    }
  }

  const agregarMensaje = (mensaje) => {
    setMessages([...messages, mensaje]);
  };

  const handleInputChange = (event) => {
    setMensajeInput(event.target.value);
  };

  const handleSendMessage = async () => {

    console.log(message);
    const messageObj = {
      message: message,
      senderId: props.userId,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }

    //Almasenar el mensaje
    const docRef = await db.collection("messages").doc(props.projectId).collection("messages").add(messageObj);
  };

  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <>
      <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        <div className="box border border-gray-300 dark:border-bars bg-white dark:bg-bars h-16 flex justify-start flex-row items-center px-5 rounded-md">
          <div>
            <img className="ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full  w-12" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" />
          </div>
          <div>
            <div className="intro-y text-md ml-5 font-medium text-bars dark:text-white">{props.project.name}</div>
            <div id='roomname' className="intro-y text-md ml-5 font-semibold text-gray-400">Ideas</div>
          </div>

          <div className="flex flex-row ml-auto text-gray-400 space-x-3">

            <Link to="/calls">
              <BsCamera size={23} />
            </Link>
            <BsMic size={23} />
            <AiOutlineUserAdd size={23} onClick={addUser} />
          </div>
        </div>

        {/*MESSAGES----------------*/}
        <div className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">
          {messages.map((me, index) => {
            return <Message message={me} 
            user={props.user}
            userId={props.userId}
            key={index}/>
          }
          )}

        </div>

        <div className="bg-white dark:bg-bars h-16 chat-input box border-gray-300 dark:border-bars rounded-md border flex items-center pl-2 pr-2 py-4 ">
          <input type="file" className="bg-gray-300 text-back dark:bg-bars dark:text-white file-input file-input-bordered w-full max-w-xs" />
          <input type="text" placeholder="Type here" className="bg-white text-back dark:bg-bars dark:text-white ml-2 input input-bordered input-primary w-full " onChange={(e) => setMessage(e.target.value)} />
          <BsEmojiSmile size={23} className="text-gray-400 ml-2 w-10" />
          <AiOutlineSend size={23} className="text-gray-400 w-10 ml-3" onClick={handleSendMessage} />
        </div>

      </div>
    </>
  )
}

export default ChatBox;