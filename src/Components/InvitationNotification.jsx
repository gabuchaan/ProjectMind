
import React from "react";
import { getDoc, doc, getDocs, collection, query, where, orderBy, limit, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db} from "../firebase.js";
import { log } from "util";

const InvitationNotification = (props) => {
    console.log(props);
    //------------------------------------------
    //--------------- VARIABLES ----------------
    //------------------------------------------

    //------------------------------------------
    //----------------- HOOKS ------------------
    //------------------------------------------

    //------------------------------------------
    //--------------- FUNCTIONS ----------------
    //------------------------------------------
    async function joinToProject () {
        console.log(props.userId);

        const invitedUserRef = doc(db, "users", props.userId);
        await updateDoc(invitedUserRef, {
            invited: arrayRemove(props.project[0].id),
        });

        const joinProjectRef = doc(db, "projects", props.project[0].id);
        await updateDoc(joinProjectRef, {
            invitation: arrayRemove(props.userId),
            member: arrayUnion(props.userId)
        })

    }

    async function rejectProject() {
        console.log(props.project[0]);
        const invitedUserRef = doc(db, "users", props.userId);
        await updateDoc(invitedUserRef, {
            invited: arrayRemove(props.project[0].id),
        });

        const joinProjectRef = doc(db, "projects", props.project[0].id);
        await updateDoc(joinProjectRef, {
            invitation: arrayRemove(props.userId)
        })
    }

    //------------------------------------------
    //--------------- COMPONENT ----------------
    //------------------------------------------
    return (
        <>
            <div id="toast-message-cta" class="hover:scale-105 hover:shadow-lg cursor-pointer transition-all w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                <div class="flex">
                    <img class="w-8 h-8 rounded-full shadow-lg" src="https://tecdn.b-cdn.net/img/new/avatars/3.webp" alt="Jese Leos image" />
                    <div class="ml-3 text-sm font-normal">
                        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Max Jones</span>
                        <div class="mb-2 text-sm font-normal">{props.project[0].data.name}</div>
                        <a onClick={joinToProject} href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300">Accept</a>
                        <a onClick={rejectProject} href="#" class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ml-3">Decline</a>
                    </div>
                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default InvitationNotification;