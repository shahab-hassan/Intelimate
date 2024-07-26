import React from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"

import SocialSignin from '../Components/SocialSignin';

function Register() {

  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPass, setConfirmPass] = React.useState("");
  let [passwordHidden, setPasswordHidden] = React.useState(true);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const registerUser = (e) => {

    e.preventDefault();

    axios.post("http://localhost:5000/api/v1/register", { firstName, lastName, username, email, password, confirmPass }).then(() => {

      enqueueSnackbar("Registered Successfully!", { variant: "success" })
      
      navigate("/login")
    })
    .catch((e) => {
      enqueueSnackbar(e.response.data.error, { variant: "error" })
    })
  }

  return (
    <div className='registerDiv'>

      <section>

        <div className="registerImgDiv">
          <img src="./images/register.svg" alt="Error" />
        </div>

        <div className="registerBox">

          <div className="headingDiv">
            <h1 className="heading">Register</h1>
          </div>

          <form className="registerForm" onSubmit={registerUser}>

            <div className='fullName'>

              <div className='inputField'>
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder='Enter first name' 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className='inputField'>
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder='Enter last name' 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

            </div>

            <div className='inputField'>
                <label htmlFor="email">Username</label>
                <input 
                  type="text" 
                  name="username" 
                  placeholder='Enter username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className='inputField'>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder='Enter email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='inputField'>
                <label htmlFor="password">Password</label>
                <div className='passwordInput'>
                  <input
                    type={passwordHidden? "password": "text"}
                    name='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='hidePasswordBtn' onClick={()=>setPasswordHidden((oldValue)=> !oldValue)}>
                      <i className={passwordHidden? "fa-solid fa-eye-slash":"fa-solid fa-eye"}></i>
                  </div>
                </div>
            </div>

            <div className='inputField'>
                <label htmlFor="confirmPass">Re-Enter Password</label>
                <input 
                  type={passwordHidden? "password": "text"}
                  name="confirmPass" 
                  placeholder='Enter password again' 
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
            </div>

            <div>
                <input 
                  type="submit" 
                  value="Sign Up Free" 
                  className='btn' 
                />
            </div>

            <SocialSignin/>

            <div className='loginBtnDiv'>
              <Link to="/login" className='loginBtn'>Have an Account? <span>Login</span></Link>
            </div>

          </form>

        </div>

      </section>
    </div>
  )
}

export default Register