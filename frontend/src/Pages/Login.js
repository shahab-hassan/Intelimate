import React from 'react'
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"
import {useSnackbar} from "notistack"

import SocialSignin from '../Components/SocialSignin';

function Login({setIsLoggedin}) {

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [passwordHidden, setPasswordHidden] = React.useState(true);

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const loginUser = async (e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/api/v1/login", {email, password})
      enqueueSnackbar("LoggedIn Successfully!", {variant: "success"})
      setIsLoggedin(true);
      navigate("/")
    }
    catch(e){
      enqueueSnackbar(e.response.data.error, {variant: "error"})
    }
  }

  return (
    <div className='loginDiv'>

      <section>

        <div className="loginImgDiv">
          <img src="./images/login.svg" alt="Error" />
        </div>

        <div className="loginBox">

          <div className="headingDiv">
            <h1 className="heading">Login</h1>
          </div>

          <form className="loginForm" onSubmit={loginUser}>

            <div className='inputField'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Enter email' 
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

            <div>
              <Link to="/resetPasswordRequest" className='loginBtn'>Forgot Password?</Link>
            </div>

            <div>
                <input type="submit" value="Log in" className='btn' />
            </div>

            <SocialSignin/>

            <div className='registerBtnDiv'>
              <Link to="/register" className='registerBtn'>Don't have an Account? <span>Sign up</span></Link>
            </div>

          </form>

        </div>

      </section>
    </div>
  )
}

export default Login