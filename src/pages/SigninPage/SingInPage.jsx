import React, { useState } from 'react'
import styles from './SingInPage.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase/config';
import { useNavigate } from 'react-router';



const SingInPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
    navigate('/')
  }

  return (
    <>
    <div className={`${styles.loginBox} container`}>
    <h4 style={{fontSize:'5.4vh'}}>Inicia sesión</h4>
        <form onSubmit={handleSubmit}>
            <div className="form-group text-center">
            <label className={`${styles.label} pb-1`}>Mail</label>
            <input
                type='text'
                name='Email'
                className='form-control'
                id='email'
                value={email}
                style={{borderRadius:'0.6vh', backgroundColor:'rgba(50, 50, 50, 0.941)'}}
                onChange={(e) => { setEmail(e.target.value)}}
            />
          </div>
          <div className='form-group text-center'>
            <label className={`${styles.label} pb-1`}>Contraseña</label>
            <input
                type='password'
                name='password'
                className='form-control'
                id="password"
                value={password}
                style={{borderRadius:'0.6vh', backgroundColor:'rgba(50, 50, 50, 0.941)'}}
                onChange={(e) => { setPassword(e.target.value)}}
            />
            </div>
            <div className={`${styles.sendbtn} form-group pt-4`}>
            <button type="submit" className={`${styles.sendLogin} btn`}>Ingresar</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default SingInPage