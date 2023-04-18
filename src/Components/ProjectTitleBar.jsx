import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsCamera, BsMic } from "react-icons/bs";

const ProjectTitleBar = (props) => {
    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------

    async function addUser(){
        const Swal = require('sweetalert2')
        //------DIRECCION CORREO-----------
        const { value: email } = await Swal.fire({
          title: 'Invite user',
          input: 'email',
          inputLabel: 'user email address',
          inputPlaceholder: 'Enter user email address'
        })
        
        if (email) {
          Swal.fire(`Entered email: ${email}`)
        }
      
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
        
        if (role) {
          Swal.fire(`You selected: ${role}`)
        }
      }
      

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <div className="box border border-bars bg-bars h-16 flex justify-start flex-row items-center px-5 rounded-md">
              <div>
                <img className="ring-2 ring-gray-600 border-4 border-transparent rounded-full  w-12" src="https://tecdn.b-cdn.net/img/new/avatars/8.webp" />
              </div>
              <div>
                <div className="intro-y text-md ml-5 font-medium text-white">{props.project_name}</div>
                <div className="intro-y text-sm ml-5 font-extralight text-gray-400">Online</div>
              </div>

              <div className="flex flex-row ml-auto text-gray-400 space-x-3">
                <BsCamera size={23} />
                <BsMic size={23} />
                <AiOutlineUserAdd size={23} onClick={addUser}/>
              </div>
            </div>
    )
}

export default ProjectTitleBar;