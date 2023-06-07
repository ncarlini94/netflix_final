import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import LoginNavbar from './../../components/LoginNavbar/LoginNavbar'
import {auth} from '../../firebase/config';
import Footer from '../../components/Footer/Footer'

const PublicLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const paths = ['/signup'];
    const path = location.pathname;




    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate('/home');
          }
        });
    }, [navigate])

    const signUpState = path !== 'signup';

    console.log(signUpState)


  return (
    <>
    <div style={{
        backgroundSize: 'cover',
        backgroundColor: '#000',
        width: "auto",
        height:"100vh",
        paddingBottom:"152px",
        backgroundPosition: 'center',
        backgroundImage: path !== '/signup' ?
        `url(https://assets.nflxext.com/ffe/siteui/vlv3/76c10fc9-7ccd-4fbf-bc59-f16a468921ca/436c7de4-6306-437e-8fd3-f2c37fd1b069/AR-es-20230529-popsignuptwoweeks-perspective_alpha_website_large.jpg)`
        : 'none',
        boxShadow: path !== '/signup' ? 'inset 0 0 0 2000px rgba(0,0,0,0.25)': 'none'
        }}>
        {!paths.includes(path) && <LoginNavbar/>}
        <Outlet />
    </div>
    <Footer/>
    </>
  )
}

export default PublicLayout