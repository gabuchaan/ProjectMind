
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend, AiOutlineUserAdd, AiOutlineBell } from "react-icons/ai";
import { BsCamera, BsMic, BsEmojiSmile, BsFileEarmarkPdfFill, BsCloudArrowUp, BsGear } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import { db } from "../firebase.js";
import MyMessage from './MyMessage';
import { Link, useNavigate } from "react-router-dom";
import { inviteUser } from "../Js/project";
import { log } from 'util';
import { collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { propTypes } from 'react-bootstrap/esm/Image';
import * as monaco from 'monaco-editor';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';


/**
 * 
 * @param {*} props 
 * project={project}
 * projectId={projectId}
 * authUser={authUser}
 * user={user}
 * userId={userId}
 * tasks={tasks}
 * @returns 
 */
const ChatBox = (props) => {
  console.log(props);
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [project, setProject] = useState(props.project);
  const [myRole, setMyRole] = useState("");

  useEffect(() => {

    if (props.projectId) {
      db.collection("messages").doc(props.projectId).collection("messages").orderBy("created_at")
        .onSnapshot((snapShot) => {
          setMessages(snapShot.docs.map((doc) => doc.data()))
        });

      setProject(props.project);

      props.member.map((mem) => {
        if (mem.uid == props.userId) {
          setMyRole(mem.role);
        }
      });
    }
  }, [props]);


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

  const messageContainerRef = useRef(null);

  const handleSendMessage = async () => {

    const messageObj = {
      message: message,
      senderId: props.userId,
      avatar: props.user.avatar,
      name: props.user.name,
      role: myRole,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }

    //Almasenar el mensaje
    const docRef = await db.collection("messages").doc(props.projectId).collection("messages").add(messageObj);

    document.getElementById("inputMessage").value = "";
    messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);

  };

  

  return (
    <>
      <div className=" chat-box border-gray-300 dark:border-boxes col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
        <div className="box border border-gray-300 dark:border-blue-900 bg-white dark:bg-bars h-20 flex justify-start flex-row items-center px-5 rounded-md">
          <div>
            <img className="ring-2 ring-gray-300 dark:ring-gray-600 border-4 border-transparent rounded-full  w-12" src={project.image} />
          </div>
          <div className='flex items-center'>
            <div className="intro-y text-2xl ml-5 font-medium text-bars dark:text-white">{project.name}</div>
            <div id='roomname' className="intro-y text-md ml-5 font-semibold text-gray-400">Ideas</div>
          </div>

          <div className="flex flex-row ml-auto text-gray-500 dark:text-gray-400 space-x-3">

            <Link to="/calls">
              <BsCamera className='dark:hover:text-gray-100 transition-all' size={23} />
            </Link>
            <BsMic className='cursor-pointer dark:hover:text-gray-100  transition-all' size={23} />
            <AiOutlineUserAdd className='cursor-pointer dark:hover:text-gray-100 transition-all' size={23} onClick={addUser} />
          </div>
        </div>

        {/* <Editor
          className='mt-2'
          height="30vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          options={{
            minimap: { enabled: false },
            roundedSelection: true,
            wordWrap: "on",
            theme: "vs-dark"
          }}
          editorDidMount={(editor, monaco) => {
            editor.getModel().updateOptions({ tabSize: 2 });
            editor.updateOptions({ fontFamily: 'Courier New' });
            editor.updateOptions({ lineNumbers: 'off' });
            editor.updateOptions({ roundedSelection: true });
            editor.updateOptions({ theme: 'vs-dark' });
            editor.updateOptions({ lineDecorationsWidth: 2 });
            editor.updateOptions({ autoClosingBrackets: true });
            editor.updateOptions({ colorDecorators: true });

            // Personalizar estilos CSS
            editor.getContainerDomNode().style.height = "30vh";
            editor.getContainerDomNode().style.borderRadius = "0.375rem";
            editor.getContainerDomNode().style.backgroundColor = "#000";
          }}
        /> */}

        {/*MESSAGES----------------*/}
        <div ref={messageContainerRef} className="overflow-y-scroll scrollbar-hidden scrollbar-hide pt-5 flex-1 float-left">
          {messages.map((me, index) => {
            return <Message
              message={me}
              user={props.user}
              userId={props.userId}
              key={index} />
          }
          )}

        </div>

        <div className="bg-white dark:bg-bars h-16 chat-input box border-gray-300 dark:border-bars rounded-md border flex items-center pl-2 pr-2 py-4 ">
          <input type="file" className="bg-gray-300 text-back dark:bg-bars dark:text-white file-input file-input-bordered w-full max-w-xs" />
          <input type="text" id='inputMessage' placeholder="Type here" className="bg-white text-back dark:bg-bars dark:text-white ml-2 input input-bordered input-primary w-full " onChange={(e) => setMessage(e.target.value)} />
          <BsEmojiSmile size={23} className="text-gray-400 ml-2 w-10" />
          <AiOutlineSend size={23} className="text-gray-400 w-10 ml-3" onClick={handleSendMessage} />
        </div>

      </div>
    </>
  )
}

export default ChatBox;