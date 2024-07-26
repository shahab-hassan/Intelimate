import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Header({isLoggedin, setIsLoggedin}) {

  const [menuOpened, setMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);
  const menuRef = useRef(null);
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
      if (window.innerWidth > 770) {
        setMenuOpened(false);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
    };
    
    const logoutUser = ()=>{
      if(window.confirm("You are logging out from Intellimate...")){
        localStorage.setItem("isLoggedin", false)
        setIsLoggedin(false);
        enqueueSnackbar("Logged out Successfully!", {variant: "success"});
      }
      setMenuOpened(!menuOpened);
    }

  return (
    <header>
      <div className="logoDiv">
        <img src="./images/logo.png" alt="Error" />
      </div>

      <nav ref={menuRef}>
        <ul className='ul' style={{ display: isMobile ? (menuOpened ? 'flex' : 'none') : 'flex' }}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/reports" onClick={toggleMenu}>Reports</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/blog" onClick={toggleMenu}>Blog</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          {!isLoggedin && <li><Link to="/login" className={isMobile ? "" : "btnSecondary"} onClick={toggleMenu}>Login</Link></li>}
          {!isLoggedin && <li><Link to="/register" className={isMobile ? "" : "btn"} onClick={toggleMenu}>Register</Link></li>}
          {isLoggedin && <li><Link to="/" className={isMobile ? "" : "btn"} onClick={logoutUser}>Logout</Link></li>}
        </ul>

        {isMobile && (
          <>
            <button
              id="open_menu_btn"
              onClick={toggleMenu}
              style={{ display: menuOpened ? 'none' : 'inline-block' }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <button
              id="close_menu_btn"
              onClick={toggleMenu}
              style={{ display: menuOpened ? 'inline-block' : 'none' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
