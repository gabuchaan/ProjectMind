import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { setInitProject } from "../Js/project.js";
import { createDefaultIcon } from "../Js/user";
import Spline from '@splinetool/react-spline';

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

                    setInitProject(uid, displayName);
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
                <div className="flex fixed w-screen h-16 bg-black shadow-lg z-40"></div>
                <Spline className="mt-10" scene="https://prod.spline.design/UGqjL7ZSlLACfNhg/scene.splinecode" />
                <div className="text-white fixed top-52 right-52 font-bold text-8xl">Colaborate with people</div>
                <div className=" flex flex-col bg-fondos border-2 border-blue-900 rounded-md w-96 h-80 justify-center items-center fixed right-40 top-80 mt-16">
                    <h1>Login page</h1>
                    <label>correo</label>
                    <input id="email" type="email" style={{ background: 'gray' }}></input>
                    <label>contraseña</label>
                    <input id="password" type="password" style={{ background: 'gray' }}></input>
                    <button style={{ background: 'green', marginLeft: '20px' }} onClick={signIn}>Submit</button>

                    <br></br>
                    <div style={{ marginTop: '30px', padding: '20px' }}>
                        <button style={{ background: 'gray' }} onClick={signInWithGoogle}>Google</button>
                        {/* <button style={{ background: 'blue' }} onClick={signInWithFacebook}>Facebook</button>
                    <button style={{ background: 'black', color: 'white' }} onClick={signInWithGithub}>Github</button> */}
                    </div>
                    <Link to="/register"><button style={{ marginLeft: '50px', background: 'purple' }}>Register</button></Link>
                </div>

            </div>
        </>
    )
}

export default Login;