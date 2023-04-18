import { db} from "../firebase.js";
import firebase from 'firebase/compat/app';
import { createDefaultIcon } from "../Js/user";
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";

/**
 * Funcion para crear un projecto por defecto si no tienr projecto.
 * @param {*} uid 
 * @param {*} name 
 */
async function setInitProject(uid, name) {

    //Crear un projecto en Projects
    const data = {
        name: `${name}'s First Project`,
        admin: uid,
        image: `https://ui-avatars.com/api/?name=${name}'s First Project&background=random&rounded=true&format=svg`,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
        invitation: [],
        member: [uid],
    };
    const res = await db.collection('projects').add(data);

    //Crear una collection en users
    const userProjectRef = await db.collection('users').doc(uid).collection('projects').add({project: res.id});
}

/**
 * Funcion para obtener todos los projecto del usuario.
 * @param {*} uid 
 */
async function getAllProjects(uid) {
    const docRef = collection(db, "projects");
    // const q = query(docRef, where("admin", "==", uid));
    const q = query(docRef, where("member", "array-contains", uid));
    getDocs(q).then((snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, data: doc.data() });
        });
        return results;
    });
}

async function createProject(uid, projectName) {
    // crear un projecto en projecto
    const data = {
        name: projectName,
        admin: uid,
        image: `https://ui-avatars.com/api/?name=${projectName}&background=random&rounded=true&format=svg`,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        last_connection_at: firebase.firestore.FieldValue.serverTimestamp(),
        invitation: [],
        member: [uid],
    };
    const res = await db.collection('projects').add(data);

    //Crear un projecto en users
    const userProjectRef = await db.collection('users').doc(uid).collection('projects').add({project: res.id});
}

async function getRecientProject(uid){
    const projectRef = collection(db, "projects");
    const q = query(projectRef, where("admin", "==", uid), orderBy("last_connection_at"), limit(1));
    const querySnapshot = await getDocs(q);
}

function removeProject(params) {
    
}

function addUser(params) {
    
}

function removeUser(params) {
    
}

function joinToProject(params) {
    
}

export { setInitProject, getAllProjects, createProject, removeProject, addUser, removeUser, joinToProject, getRecientProject }