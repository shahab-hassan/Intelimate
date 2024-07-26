import React from 'react'
import { Link } from "react-router-dom"

function SocialSignin() {

    const googleLogin = () => {
        window.location.href = "http://localhost:5000/api/v1/auth/google";
      };
      const facebookLogin = () => {
        window.location.href = "http://localhost:5000/api/v1/auth/facebook";
      };

  return (
    <div className='socialSigninDiv'>
        <div>
            <Link className='btnSecondary socialSigninBtn' onClick={googleLogin}>
                <img src="./images/google.png" alt="Error" />Continue with Google
            </Link>
        </div>
        <div>
            <Link className='btnSecondary socialSigninBtn' onClick={facebookLogin}>
                <img src="./images/fb.png" alt="Error" />Continue with Facebook
            </Link>
        </div>
    </div>
  )
}

export default SocialSignin