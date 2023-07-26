import React, { useState } from 'react'
import CreatePassword from './Steps/CreatePassword/CreatePassword'
import ChoosePlan from './Steps/ChoosePlan/ChoosePlan'
import PaymentMethod from './Steps/PaymentMethod/PaymentMethod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Avatar from '../../assets/imagen/avatares/avatar.jpg'
import styles from "./FormStepsRegister.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as NetflixLogo } from '../../assets/imagen/logo.svg'

const FormStepsRegister = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        name: '',
        plan: '',
        number: '',
        expiry: '',
        cvc: '',
        focus: '',
        issuer: '',
    });
    const FormTitles = [ "createPassword" , "selectPlan" , "paymentMethod"];


    const handleSubmit = async () => {
        try {
            const userRegister = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const docRef = doc(firestore, `NetflixUsers/${userRegister.user.email}`);
            const userQuery = await getDoc(docRef);
            if (!userQuery.exists()) {
                await setDoc(docRef, {
                    id: userRegister.user.uid,
                    email: formData.email,
                    name: formData.name,
                    language: 'es',
                    plan: formData.plan,
                    number: formData.number,
                    expiry: formData.expiry,
                    cvc: formData.cvc,
                    issuer: formData.issuer,
                    profiles: [
                        {
                        name: 'Perfil 1',
                        avatar: await Avatar,
                        id: Math.random().toString(36).substr(2, 9),
                        favorites: []
                        }
                    ],
                });
                const savedDoc = await getDoc(docRef);
                const savedProfile = savedDoc.data().profiles[0];
                navigate('/Profiles', { state: {profile:savedProfile} })
            }
            }
            catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const PageDispley = () => {
        switch (page) {
            case 0:
                return <CreatePassword formData={formData} setFormData={setFormData}/>
            case 1:
                return <ChoosePlan formData={formData} setFormData={setFormData}/>
            case 2:
                return <PaymentMethod formData={formData} setFormData={setFormData}/>
            default:
        }
    }


return (
    <>
    <nav className={`${styles.navbar} navbar navbar-expand-sm`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <NetflixLogo className={`${styles.logo}`}/>
                </Link>
                <div>
                    <button className={`${styles.sesionBtn} btn`}>
                    <Link style={{color:'rgb(255,255,255)', textDecoration:'none'}} to="/SingIn">Iniciar Sesion</Link>
                    </button>
                </div>
            </div>
        </nav>
        <div className={`container d-flex justify-content-center`}>
        <div className='row'>
        <h4 className='col-sm-12 d-flex justify-content-center'> PASO {page+1} DE 3</h4>
            <div className='col-sm-12'>
                {PageDispley()}
            </div>
            <div className='col-sm-12 d-flex justify-content-center'>
                <button className={`${styles.buttom} btn`}
                onClick={() =>{page === FormTitles.length -1 ? handleSubmit() : setPage((currPage) => currPage +1)}}
                >
                    Siguiente
                </button>
            </div>
            </div>
        </div>
    </>
)
}

export default FormStepsRegister