import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='heroDiv'>
        <h1>Intelligent Symptomate</h1>
        <p>Accurate disease diagnosis and skin cancer detection at your fingertips</p>
        <div className="heroBtns">
            <Link to="/detect-disease" className='btn'>
                <span>Detect Diseases</span>
                <span><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
            <Link to="/detect-skin-cancer" className='btn'>
                <span>Detect Skin Cancer</span>
                <span><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
        </div>
        <img src="./images/black.jpg" alt="Error" className='blackBgImg' />
        <img src="./images/bg.jpg" alt="Error" className='heroBgImg' />
    </div>
  )
}

export default Hero