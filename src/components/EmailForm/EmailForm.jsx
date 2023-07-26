import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { firestore } from '../../firebase/config';
import styles from './EmailForm.module.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const EmailForm = () => {

  const { t } = useTranslation()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const usersRef = collection(firestore, 'NetflixUsers');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        setUserExists(!querySnapshot.empty);
      } catch (error) {
        console.error('Error al verificar el usuario:', error);
      }
    };
    checkUserExists();
  }, [email]);

  const handleEmail = (e) => {
    e.preventDefault();
    if (email === '') {
      return;
    }
    if (userExists) {
      setError('El correo electrónico ya está registrado.');
    } else {
      setError('');
      navigate('/signup', {state:email});
    }
  };

  return (
    <>
      <div className={`${styles.formBox}`}>
        <div className={`${styles.text}`}>
          <h1 className={`${styles.textTitle}`}>Películas y series ilimitadas y mucho más</h1>
          <h3 className={`${styles.textBody}`}>Disfruta donde quieras. Cancela cuando quieras.</h3>
          <h4 className={`${styles.textFooter}`}>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</h4>
        </div>
        <form
          className={`${styles.form} row`}
          onSubmit={handleEmail}
        >
          <input
            className='form-control col-sm'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white'
            }}
            placeholder='Email'
            type="email"
            name="emailregister"
            id="emailregister"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className='btn'>{t('getStarted')}</button>
          <h4 className='bg-danger'>{error}</h4>
        </form>
      </div>
    </>
  );
};

export default EmailForm;
