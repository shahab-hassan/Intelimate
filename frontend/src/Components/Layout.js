import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header'
import Footer from './Footer'

function Layout({isLoggedin, setIsLoggedin}) {
  return (
    <div>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout