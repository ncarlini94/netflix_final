import React, { useEffect, useState } from 'react'
import styles from './SingInPage.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, firestore} from '../../firebase/config';
import { useNavigate } from 'react-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useTranslation } from 'react-i18next'


const SingInPage = () => {

  const { t } = useTranslation()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const usersRef = collection(firestore, 'NetflixUsers');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        setEmailExists(!querySnapshot.empty);
      } catch (error) {
        console.error('Error al verificar el usuario:', error);
      }
    };
    checkUserExists();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      return;
    }
    if (password === '') {
      return
    }
    if (!emailExists) {
      setError('El correo electrónico no se encuentra registrado.');
    } else {
      setError('');
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/Profiles');
      } catch (error) {
        setError('La contraseña es incorrecta. Por favor, verifica tu contraseña.');
      }
    }
  }

  return (
    <>
    <div className={`${styles.loginBox} container text-center`}>
    <h4 style={{fontSize:'5.4vh'}}>{t('SignIn')}</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group text-center">
            <label className={`${styles.label} pb-1`}>Mail</label>
            <input
                type='text'
                name='Email'
                className={`${styles.input} form-control`}
                id='email'
                value={email}
                style={{borderRadius:'0.6vh', backgroundColor:'rgba(50, 50, 50, 0.941)', color:'rgb(255,255,255)'}}
                onChange={(e) => { setEmail(e.target.value)}}
            />
          </div>
          <div className='form-group text-center'>
            <label className={`${styles.label} pb-1`}>{t('password')}</label>
            <input
                type='password'
                name='password'
                className={`${styles.input} form-control`}
                id="password"
                value={password}
                style={{borderRadius:'0.6vh', backgroundColor:'rgba(50, 50, 50, 0.941)', color:'rgb(255, 255, 255)'}}
                onChange={(e) => { setPassword(e.target.value)}}
            />
            </div>
            <div className={`${styles.sendbtn} form-group pt-4`}>
            <button type="submit" className={`${styles.sendLogin} btn`}>{t('login')}</button>
            </div>
            <h4 className='bg-danger mt-2'>{error}</h4>
        </form>
    </div>
    </>
  )
}

export default SingInPage