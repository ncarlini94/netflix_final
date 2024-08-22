import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import LoginNavbar from './../../components/LoginNavbar/LoginNavbar'
import {auth} from '../../firebase/config';
import Footer from '../../components/Footer/Footer'
import EmailForm from '../../components/EmailForm/EmailForm';
import styles from './PublicLayout.module.css'

const PublicLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const isSignUpPage = path === '/signup';
    const isSignInPage = path === '/SignIn';


    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate('/Profiles');
          }
        });
    }, [navigate])




  return (
    <>
    <div
        className={`${styles.background}`}
        style={{
          width:'100%',
          backgroundImage: path !== '/signup' ?
          `url(https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/4ce87c6a-9742-41a0-84db-b2610f4d448d/AR-es-20240820-TRIFECTA-perspective_WEB_c2dc0d09-eb32-42ca-9711-1c4e51e89d3d_medium.jpg)`
          : 'none',
          boxShadow: path !== '/signup' ? 'inset 0 0 0 2000px rgba(0,0,0,0.56)': 'none'
        }}>
        {!isSignUpPage && <LoginNavbar />}
        {!isSignUpPage && !isSignInPage && <EmailForm />}
        <Outlet />
    </div>
      {!isSignUpPage && !isSignInPage && <Footer/>}
    </>
  )
}

export default PublicLayout