import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import LoginNavbar from './../../components/LoginNavbar/LoginNavbar'
import {auth} from '../../firebase/config';

const PublicLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const paths = ['/signup', '/signin', '/loginhelp'];
    const path = location.pathname;
    
    useEffect(() => {
    }, [auth])

      onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate("/home");
          }
        });


  return (
    <>
    <div style={{
        backgroundSize: 'cover',
        backgroundColor: '#000',
        width: "100vw",
        height:"100vh",
        paddingBottom:"152px",
        backgroundPosition: 'center',
        backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/efb4855d-e702-43e5-9997-bba0154152e0/479b19fa-00ec-4db3-8fa8-d4808ae6a0d6/AR-es-20230417-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
        boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)'
        }}>
        {!paths.includes(path) && <>
            <LoginNavbar/>
        </>}
        <Outlet />
    </div>
    </>
  )
}

export default PublicLayout