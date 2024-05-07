import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from './firebase.config';
import axios from 'axios'

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState("")
    //console.log(AuthProvider);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    } 

     const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }
     // update your profile
     const updateUserProfile = (name, photoURL) => {
        return  updateProfile(auth.currentUser, {
              displayName: name, photoURL: photoURL
            })
      }
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            if(currentUser){
                const userInfo ={email: currentUser?.email}
                //console.log(userInfo);
                axios.post("https://foodi-backend-1.onrender.com/jwt",userInfo)
                .then(res=>{
                    //console.log(res?.data?.token);
                    if(res.data.token){
                    localStorage.setItem("access-token",res?.data?.token)
                    }
                })
            }
            else{
                localStorage.removeItem("access-token")
            }
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo={
        user,
        createUser,
        login,
        logOut,
        signUpWithGmail,
        loading,
        updateUserProfile
    }
  return (
    <AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
  )
}

export default AuthProvider
