import { auth, db } from "../firebase.js";


function getAuthUser(){
    const user = auth.currentUser;
    return user;
}

async function getUserFromAuth(uid){
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    console.log(doc.data());
    return doc.data();
}

function createDefaultIcon(name) {
    const image = `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true&format=svg`;
    return image
}

async function getUser(uid){
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    return doc.data();
}


export { getAuthUser, createDefaultIcon, getUserFromAuth, getUser }