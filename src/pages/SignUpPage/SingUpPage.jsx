import React, { useState } from 'react'
import styles from "./SingUnPage.module.css"
import {auth, firestore} from './../../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router'
import Avatar  from '../../assets/imagen/avatar.png'
import { addDoc, collection } from 'firebase/firestore';


const SingUpPage = () => {

    const navigate = useNavigate();
    const avatar = Avatar;
    const [user, setUser] = useState({
        email:'',
        password:'',
        displayName: '',
    })



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { email, password, displayName } = user;
            const docRef = await createUserWithEmailAndPassword(auth, user.email, user.password)
            await updateProfile(auth.currentUser, {
            displayName,
            photoURL: avatar
            })
            await addDoc(collection(firestore, "NetflixUsers"),{
                id: docRef.user.uid,
                email: docRef.user.email,
                name: docRef.user.displayName,
                avatar: avatar,
            })
            .then(() => {
            navigate("/home");
            }).catch((error) => {
            console.error("No cargo el Avatar");
            });
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



return (
    <>
    <div className='container pt-5 pb-5'>
        <form onSubmit={handleSubmit}>
            <div className="form-group col-md-4 offset-md-4 text-center pb-3">
            <label className={`${styles.label} pb-2`}>Mail</label>
            <input
                type='text'
                name='email'
                className='form-control'
                value={user.email}
                onChange={handleChange}
            />
          </div>
          <div className='form-group col-md-4 offset-md-4 text-center'>
            <label className={`${styles.label} pb-2`}>Contraseña</label>
            <input
                type='password'
                name='password'
                className='form-control'
                value={user.password}
                onChange={handleChange}
            />
            <div className="form-group col-md-4 offset-md-4 text-center pb-3">
            <label className={`${styles.label} pb-2`}>Nombre</label>
            <input
                type="text"
                name="displayName"
                className="form-control"
                value={user.displayName}
                onChange={handleChange}
            />
        </div>

            </div>
            <div className="form-group col-sm-2 offset-md-5 pt-5">
            <button type="submit" className="form-control btn-primary">Enviar</button>
            </div>
        </form>
    </div>
    </>
)
}

export default SingUpPage;