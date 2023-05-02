import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { setInitProject } from "../Js/project.js";
import { createDefaultIcon } from "../Js/user";
import Spline from '@splinetool/react-spline';
import { FcGoogle } from "react-icons/fc";


const Login = () => {

    //-------------------------------------
    //------------ VARIABLES --------------
    //-------------------------------------
    const authLogin = getAuth();
    const navigate = useNavigate();

    //---------------------------------
    //------------ HOOKS --------------
    //---------------------------------

    //-------------------------------------
    //------------ FUNCTIONS --------------
    //-------------------------------------
    /**
     * Sign in con la cuenta de la aplicaión.
     */
    function signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(authLogin, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("test");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    /**
     * Sign in con google.
     */
    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(async (result) => {
            if (result.user !== null) {
                const displayName = result.user.displayName;
                const uid = result.user.uid;
                const eMail = result.user.email;
                const data = {
                    name: displayName,
                    uid: uid,
                    e_mail: eMail,
                    avatar: createDefaultIcon(displayName),
                    created_at: firebase.firestore.FieldValue.serverTimestamp()
                };
                const userRef = db.collection('users').doc(result.user.uid);
                const user = await userRef.get();

                // Si no existe el usuario se registra en el db
                if (!user.exists) {
                    console.log('No such document!');
                    const res = await db.collection('users').doc(uid).set(data);

                    setInitProject(uid, displayName, data.avatar);
                }

                navigate("test");
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(error);
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
        });
    }


    // /**
    //  * Sign in con google.
    //  */
    // function signInWithFacebook() {
    //     const provider = new firebase.auth.FacebookAuthProvider();
    //     auth.signInWithPopup(provider).then((result) => {
    //         if (result.user !== null) {
    //             const displayName = result.user.displayName;
    //             const uid = result.user.uid;
    //             console.log(displayName);
    //             console.log(uid);
    //             navigate("MainPage");
    //         }

    //     }).catch((error) => {
    //         // エラー発生時は、その詳細が
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.email;
    //         const credential = error.credential;
    //         console.log(error);
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //         console.log(email);
    //         console.log(credential);
    //     });
    // }

    // /**
    //  * Sign in con Github.
    //  */
    // function signInWithGithub() {
    //     const provider = new firebase.auth.GithubAuthProvider();
    //     auth.signInWithPopup(provider).then((result) => {
    //         console.log(result);
    //         if (result.user !== null) {
    //             const displayName = result.user.displayName;
    //             const uid = result.user.uid;
    //             console.log(displayName);
    //             console.log(uid);
    //             navigate("MainPage");
    //         }

    //     }).catch((error) => {
    //         // エラー発生時は、その詳細が
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.email;
    //         const credential = error.credential;
    //         console.log(error);
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //         console.log(email);
    //         console.log(credential);
    //     });
    // }


    //------------------------------------------
    //-------------- COMPONENT -----------------
    //------------------------------------------
    return (
        <>
            <div className=" w-screen h-screen flex bg-fondos overflow-hidden">
                <Spline className="mt-10" scene="https://prod.spline.design/UGqjL7ZSlLACfNhg/scene.splinecode" />
                <div className="text-white fixed top-36 right-52 font-bold text-8xl">Colaborate with people</div>
                <div className=" flex flex-col bg-transparent border-2 p-3 border-blue-900 rounded-md w-96 h-auto justify-center items-center fixed right-64 top-64 mt-16">
                    <h1 className="text-white text-4xl font-semibold mt-2">Login</h1>
                    <div className="flex flex-col mt-6 w-full ">
                        <label className="text-gray-200 text-xl">Gmail</label>
                        <input id="email" type="email" className="border rounded-md bg-transparent h-10 pl-3 text-white"></input>
                    </div>
                    <div className="flex flex-col mt-3 w-full">
                        <label className="text-gray-200 text-xl">Password</label>
                        <input id="password" type="password" className="border rounded-md bg-transparent h-10 w-full pl-3 text-white"></input>
                    </div>
                    <button className="hover:scale-105 hover:shadow-lg transition-all w-full h-10 bg-green-500 rounded-md border text-white mt-3" onClick={signIn}>Submit</button>
                    <button className="hover:scale-105 hover:shadow-lg transition-all cursor-pointer bg-white text-black rounded-md w-full h-10 mt-3 items-center justify-start flex"  onClick={signInWithGoogle}><FcGoogle className="ml-3" size={28}/><div className="ml-28">Google</div> </button>
                    <Link to="/register" className="hover:scale-105 hover:shadow-lg transition-all cursor-pointer w-full"><button className="bg-gray-400 text-white rounded-md w-full h-10 mt-3 border">Register</button></Link>
                </div>

            </div>
        </>
    )
}

export default Login;