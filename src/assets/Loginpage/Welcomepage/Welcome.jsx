import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import './welcome.css'
import {auth} from '../Firebase'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
import Swal from 'sweetalert2';



const Welcome = () => {

    const[userName, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[showSignup, setShowSignup] = useState(false)
    const[showSignin, setShowSignin] = useState(false)
    const [userUid, setUserUid] = useState(null)

    const handleUserName = (typedValue) => {
        setUsername(typedValue.target.value)
    }

    const handleEmail = (typedValue) => {
        setEmail(typedValue.target.value)
        setUserUid(email)
    }
    const handlePassword = (typedValue) => {
        setPassword(typedValue.target.value)
    }

    const handleSignin = () => {
        console.log(email)
        console.log(password)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const users = userCredentials.user
            console.log(users)
            console.log('Signed In')
            setUserUid(users.uid);
            console.log(userUid)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your credentials are correct.'
              });
            console.log(userName)
            checkAuth()
        })

        .catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Incorrect Credentials',
                text: 'Please check your email and password'
            });
        })
    }

    const checkAuth = () => {
        onAuthStateChanged(auth, user => {
            if(user) {
                setShowSignin(true)
                setUserUid(user.uid)
            }
        })
    }
      
    const handleShowsignup = () => {
        setShowSignup(true)
    }

  return (
    <div className="body">
        {
        showSignup ? 
        <Signup /> : 
        (showSignin) ? 
        <Signin username={userName} userUid={userUid}/> :
        (
        <>
            <div className="welcome">
                <div className="sub-welcome">
                    <div className="header">
                        <h2>Welcome</h2>
                    </div>
                    <div className="welcome-body">
                        <input type="text" placeholder='username' value={userName} onChange={handleUserName}/>
                        <input type="email" placeholder='email' value={email} onChange={handleEmail}/>
                        <input type="password" placeholder='password' value={password} name='email' onChange={handlePassword} required/>
                    </div>
                    <div className="signs">
                        <button className='signin' id='btn' onClick={handleSignin}>Sign In</button>
                        <button className='signup' id='btn' onClick={handleShowsignup}>Sign Up</button>
                    </div>
                    <a href="#">forgot password?</a>
                </div>
            </div>
        </>  )
        }
    </div>
  )
}

export default Welcome