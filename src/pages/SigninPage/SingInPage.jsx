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
    <div className='container pt-5 pb-5'>
        <form onSubmit={handleSubmit}>
            <div className="form-group col-md-4 offset-md-4 text-center pb-3">
            <label className={`${styles.label} pb-2`}>Mail</label>
            <input
                type='text'
                name='Email'
                className='form-control'
                id='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value)}}
            />
          </div>
          <div className='form-group col-md-4 offset-md-4 text-center'>
            <label className={`${styles.label} pb-2`}>Contraseña</label>
            <input
                type='password'
                name='password'
                className='form-control'
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value)}}
            />
            </div>
            <div className="form-group col-sm-2 offset-md-5 pt-5">
            <button type="submit" className="form-control btn-primary">Enviar</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default SingInPage