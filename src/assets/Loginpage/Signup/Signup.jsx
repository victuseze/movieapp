import {createUserWithEmailAndPassword} from 'firebase/auth'
import React, { useState } from 'react'
import './signup.css'
import {auth} from '../Firebase'
// import Welcome from '../Welcomepage/Welcome'

const Signup = () => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleEmail =(typedValue) => {
    setEmail(typedValue.target.value)
  }
  const handlePassword = (typedValue) => {
    setPassword(typedValue.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    setEmail('')
    setPassword('')

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('working')
      console.log(email)
      console.log(password)
      alert('Yay, Account Successfully Created!')
      // onSubmit(userName)
    })
    .catch((e) => {
      console.log(e.message)
    })
  }


  return (
    <form onSubmit={submit}>
      <div id='well'>
        <div id="wells">
          <div id="head">
            <h1>Movie App</h1>
          </div>
          <div id="main">
              <input id='in' type="email" placeholder='email' value={email} onChange={handleEmail}/>
              <input id='in' type="password" placeholder='password' value={password} onChange={handlePassword}/>
              <div className="create">
                <button id='btn' type='submit'>Create Account</button>
              </div>
              <p>Already have an account? <a href="Welcome">Log in</a></p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Signup