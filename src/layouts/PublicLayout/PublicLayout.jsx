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
        backgroundSize: 'cover',
        backgroundColor: '#000',
        height:"100vh",
        backgroundPosition: 'center',
        backgroundImage: path !== '/signup' ?
        `url(https://assets.nflxext.com/ffe/siteui/vlv3/5eab1b22-c5ea-48b0-8ef4-862b3fa6df2c/c9fed70b-9392-4823-ac65-cc55c369f6dc/AR-en-20230724-popsignuptwoweeks-perspective_alpha_website_small.jpg)`
        : 'none',
        boxShadow: path !== '/signup' ? 'inset 0 0 0 2000px rgba(0,0,0,0.56)': 'none'
        }}>
        {!isSignUpPage && <LoginNavbar />}
        {!isSignUpPage && !isSignInPage && <EmailForm />}
        <Outlet />
    </div>
    <Footer/>
    </>
  )
}

export default PublicLayout