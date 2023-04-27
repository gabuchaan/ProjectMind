import React, { useState, useEffect } from 'react'

import MenuRooms from '../Components/MenuRooms';
import MenuProfile from '../Components/MenuProfile';
import ChatBox from '../Components/Chatbox';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import Rightmenu from '../Components/Rightmenu';
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";
import { getUser, getAuthUser } from "../Js/user";
import { getInvitedProjects } from "../Js/project";
import EditProject from '../Components/EditProject';
import { BsGear } from 'react-icons/bs';
import firebase from 'firebase/compat/app';
import RightMenuTools from '../Components/RightMenuTools';

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
  const [member, setMember] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (authUser) {
      getRecentProject(authUser.uid);
    }

  }, [])

  useEffect(() => {
    if (authUser) {
      getCurrentUser(authUser.uid);
      setUserId(authUser.uid);

      db.collection("users").doc(authUser.uid)
        .onSnapshot((snapShot) => {
          getInvitationProjects(authUser.uid);
        });

      db.collection("users").doc(authUser.uid).collection("projects")
        .onSnapshot((snapShot) => {
          getProjects(authUser.uid);
        });

    }

    if (projectId) {
      db.collection('projects').doc(projectId)
        .onSnapshot((snapShot) => {
          let memberArray = [];
          snapShot.data().member.map(async (per) => {

            const docRef = doc(db, "users", per);
            const docSnap = await getDoc(docRef);
            memberArray.push(docSnap.data())
          })
          setMember(memberArray);
        })

      db.collection('projects').doc(projectId).collection('tasks')
      .onSnapshot((snapShot) => {
        let arrayTasks = [];
        snapShot.forEach((task) => {
          arrayTasks.push({id: task.id ,data: task.data()});
        })
        setTasks(arrayTasks);
      });
    }

    if (Object.keys(invitation).length === 0) {
      console.log('obj is empty');
    } else {
      console.log('obj is not empty');
    }
  }, [authUser, projectId]);

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
    const q = query(userProjectsRef, orderBy("last_connection_at", "desc"), limit(1));
    getDocs(q).then((snapshot) => {
      const projectRef = doc(db, "projects", snapshot.docs[0]._document.data.value.mapValue.fields.project.stringValue);
      getDoc(projectRef)
        .then((projectData) => {
          setProject(projectData.data());
          setProjectId(projectData.id);
        });
    })
  }

  console.log(tasks);

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

  function handleSelectProject(project) {
    setProject(project.data);
    setProjectId(project.id);
    console.log(project.id);

    const docRef = db.collection("users").doc(userId).collection("projects").doc(project.id);
    docRef.update({
      last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
    })

  }

  //------------------------------------------
  //--------------- COMPONENT ----------------
  //------------------------------------------
  return (
    <div className="bg-wback dark:bg-back">
      <Topbar />
      <Sidebar
        projects={projects}
        user={user}
        userId={userId}
        invitation={invitation}
        onClick={handleSelectProject}
      />
      {/*MAIN CONTAINER*/}
      <BsGear size={26} onClick={toggleEditProject} className='fixed top-36 left-5 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:scale-105  transition-all cursor-pointer' />

      <div className="md:pl-16 pt-16">
        <div className="bg-wback dark:bg-back -mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
          {/*SIDE MENU-------------------*/}

          <div id="menu-main" className=" side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden">
            <MenuRooms />
          </div>
          {/*EDITAR PERFIL*/}

          <div id='menu-profile' className='hidden side-content col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 side-content--active flex-col overflow-hidden '>
            <MenuProfile
            authUser={authUser}
            user={user}
            userId={userId}
            />
          </div>
          {/*CHAT----------------------------*/}


          {showEditProject ? (
            <EditProject
              project={project}
              projectId={projectId}
              authUser={authUser}
              user={user}
              userId={userId}
              member={member}
            />
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
            {/* <Rightmenu
              project={project}
              projectId={projectId}
              authUser={authUser}
              user={user}
              userId={userId}
              tasks={tasks}
            /> */}
            <RightMenuTools />
          </div>
        </div>
      </div>

      {/*MAIN CONTAINER END*/}
    </div>
  );
}

export default Test2;
