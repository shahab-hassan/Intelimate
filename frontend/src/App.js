import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import Home from "./Pages/Home";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from "./Components/Layout"
import Blog from './Pages/Blog';
import Reports from './Pages/Reports';
import About from './Pages/About';
import Contact from './Pages/Contact';
import DetectDisease from './Pages/DetectDisease';
import DetectSkinCancer from './Pages/DetectSkinCancer';
import PostDetails from './Pages/PostDetails';
import NotFound from './Components/NotFound.js';
import ResetPasswordRequest from './Components/ResetPasswordRequest.js';
import ResetPassword from './Components/ResetPassword.js';

function App() {

  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  React.useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedin') === 'true';
    setIsLoggedin(loggedIn);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login') === 'success') {
      enqueueSnackbar('You are successfully logged in!', { variant: 'success' });
      localStorage.setItem("isLoggedin", true);
      setIsLoggedin(true);
      window.history.replaceState({}, document.title, "/");
    }
  }, [location, enqueueSnackbar]);

  return (
    <Routes>
      <Route element={<Layout isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detect-disease" element={<DetectDisease />} />
        <Route path="/detect-skin-cancer" element={<DetectSkinCancer />} />
        <Route path="/postDetails" element={<PostDetails />} />
        <Route path="/resetPasswordRequest" element={<ResetPasswordRequest />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;