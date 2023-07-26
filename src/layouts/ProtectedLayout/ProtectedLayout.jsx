import { onAuthStateChanged } from 'firebase/auth'
import { Outlet, useLocation, useNavigate } from 'react-router'
import {auth} from '../../firebase/config'
import Navbar from './../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useEffect } from 'react'

const ProtectedLayout = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname;
    const isProfilePage = path === '/Profiles';

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if(!user) {
              navigate('/')
          }
      })
    }, [navigate])

  return (
    <>
        { !isProfilePage && <Navbar/> }
        <Outlet/>
        { !isProfilePage && <Footer/> }
    </>
  )
}

export default ProtectedLayout