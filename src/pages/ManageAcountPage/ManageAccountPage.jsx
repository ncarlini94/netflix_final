import React, { useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';
import { useTranslation } from 'react-i18next'
import mapLanguageToFull from '../../utils/mapLanguage';

const ManageAccount = () => {

    const { i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const getUser = async () => {
              try {
                const q = query(
                  collection(firestore, "NetflixUsers"),
                  where("id", "==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                  setUser(doc.data())
                    });
              } catch (error) {
                console.error("Error retrieving users: ", error);
              }
            };
            getUser()
          } else {
            setUser(null);
          }
        });
      }, [])


    const changeLanguage = async (e) => {
      const selectedLanguage = e.target.value;
      setSelectedLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
      try {
        if (user) {
          const userRef = doc(firestore, 'NetflixUsers', user.email.toLowerCase());
          await updateDoc(userRef, { language: selectedLanguage });
          console.log('Idioma actualizado en la base de datos:', selectedLanguage);
        }
      } catch (error) {
        console.log('Error al actualizar el idioma:', error);
      }
}




  return (
    <>
      <div className='container ps-5 pt-5'>
        {user &&
        [
          <>
            <h1 className={`${styles.title}`}>Cuenta</h1>
          <div key={user.id} className={`${styles.box}`}>
          <div className={`${styles.boxChild} row`}>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)' }} />
            <h3 className={`${styles.boxChildTitle} col-7`}>Mail: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>{user.email}</span></h3>
            <Link className={`${styles.link} col`}  to={'/ChangeEmail'}>Cambiar email</Link>
          </div>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>Contraseña: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>********</span></h3>
            <Link className={`${styles.link} col`}  to={'/ChangePassword'}>Cambiar contraseña</Link>
          </div>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)' }} />
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>Plan: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>{user.plan}</span></h3>
            <Link className={`${styles.link} col`} to={'/ChangePlan'}>Cambiar de plan</Link>
          </div>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)' }} />
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>Idioma: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>{mapLanguageToFull(selectedLanguage)}</span></h3>
            <select
              className={`${styles.selectedForm} form-select col`}
              value={i18n.language}
              onChange={changeLanguage}
              style={{maxWidth:'22vh', marginLeft:'2vh'}}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          </div>
          </>
        ]
        }
      </div>
    </>
  )
}

export default ManageAccount