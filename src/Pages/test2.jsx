import React, { useState, useEffect } from 'react'

import MenuRooms from '../Components/MenuRooms';
import MenuProfile from '../Components/MenuProfile';
import ChatBox from '../Components/Chatbox';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import Rightmenu from '../Components/Rightmenu';
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { getUser, getAuthUser } from "../Js/user";
import { getInvitedProjects } from "../Js/project";
import EditProject from '../Components/EditProject';
import { BsGear } from 'react-icons/bs';

const Test2 = () => {
  const [showEditProject, setShowEditProject] = useState(false);
  const toggleEditProject = () => {
    setShowEditProject(!showEditProject);
  };
  //------------------------------------------
  //--------------- VARIABLES ----------------
  //------------------------------------------
  const authUser = auth.currentUser;

  //------------------------------------------
  //----------------- HOOKS ------------------
  //------------------------------------------
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [invitation, setInvitation] = useState({});

  useEffect(() => {
    if(authUser){
      getRecentProject(authUser.uid);
      getProjects(authUser.uid);
      getCurrentUser(authUser.uid);
      setUserId(authUser.uid);
      getInvitationProjects(authUser.uid);

    }
  }, [authUser])
  //------------------------------------------
  //--------------- FUNCTIONS ----------------
  //------------------------------------------
  const getProjects = async (uid) => {
    const docRef = collection(db, "projects");
    const q = query(docRef, where("member", "array-contains", uid));

    getDocs(q).then((snapshot) => {
      let results = [];

      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
      });
      setProjects(results);
    });
  }

  const getRecentProject = async (uid) => {
    const userProjectsRef = collection(db, "users", uid, "projects");
    const q = query(userProjectsRef,  orderBy("last_connection_at", "desc"), limit(1));
    getDocs(q).then( (snapshot) => {
      console.log(snapshot.docs[0]._document.data.value.mapValue.fields.project.stringValue);
      const projectRef = doc(db, "projects", snapshot.docs[0]._document.data.value.mapValue.fields.project.stringValue);
      getDoc(projectRef)
      .then((projectData) => {
        console.log(projectData);
        setProject(projectData.data());
        setProjectId(projectData.id);
      });
    })
  }

  const getInvitationProjects = async (uid) => {
    let projects = [];

    getUser(uid).then((result) => {
      result.invited.map(async (project) => {
        const docRef = doc(db, "projects", project);
        const docSnap = await getDoc(docRef);

        projects.push({ id: docSnap.id, data: docSnap.data() });
      })
    })
    setInvitation(projects);
  }

  /**
 * Funcion para obtener el usuario
 */
  function getCurrentUser(uid) {
    getUser(uid).then((result) => {
      setUser(result);
    });
  }

  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <div className="bg-wback dark:bg-back">
      <Topbar />
      <Sidebar
        projects={projects}
        user={authUser}
        userId={userId}
        invitation={invitation}
      />
      {/*MAIN CONTAINER*/}
      <BsGear size={23} onClick={toggleEditProject} className='fixed top-36 left-5 hover:text-white transition-all cursor-pointer' />

      <div className="md:pl-16 pt-16">
        <div className="bg-wback dark:bg-back -mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
          {/*SIDE MENU-------------------*/}

          <div id="menu-main" className=" side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden">
            <MenuRooms />
          </div>
          {/*EDITAR PERFIL*/}

          <div id='menu-profile' className='hidden side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden '>
            <MenuProfile />
          </div>
          {/*CHAT----------------------------*/}


          {showEditProject ? (
            <EditProject />
          ) : (
            <ChatBox
            project={project}
            projectId={projectId}
            authUser={authUser}
            user={user}
            userId={userId}
            />
          )}

          



          {/*RIGHT MENU*/}

          <div className=" info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6 pt-6 ">
            <Rightmenu />
          </div>
        </div>
      </div>

      {/*MAIN CONTAINER END*/}
    </div>
  );
}

export default Test2;
