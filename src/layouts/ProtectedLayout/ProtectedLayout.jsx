import { onAuthStateChanged } from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router'
import {auth} from '../../firebase/config'
import Navbar from './../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useEffect } from 'react'

const PublicLayout = () => {

    const navigate = useNavigate()

    console.log(auth)

    useEffect(() => {
    }, [auth])

    onAuthStateChanged(auth, (user) => {
        if(!user) {
            navigate('/')
        }
    })


  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default PublicLayout