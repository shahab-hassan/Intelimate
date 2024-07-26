import React from 'react'
import {Link} from "react-router-dom"

function Footer() {
  return (
    <div className='footerDiv'>
      <section>
        <div className="footerUpper">

          <div className="footerUpperLeft">
            <img src="./images/logo.png" alt="Error" />
            <h2>Intelligent Symptomate</h2>
          </div>

          <ul className='footerUl'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>

        </div>

        <div className="footerLower">

          <div className="footerLowerLeft">

            <div>
              <i class="fa-solid fa-envelope"></i>
              <p>thisisshahab71@gmail.com</p>
            </div>

            <div>
              <i class="fa-solid fa-phone"></i>
              <p>+92 314 9458234</p>
            </div>

            <div>
              <i class="fa-solid fa-location-dot"></i>
              <p>Pakistan</p>
            </div>

          </div>

          <div className="footerLowerRight">
            <p>Copyright &copy; all rights reserved</p>
          </div>

        </div>

      </section>
    </div>
  )
}

export default Footer