import React, { useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';
import { useTranslation } from 'react-i18next'

const ManageAccount = () => {

    const { t,  i18n } = useTranslation();
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
        <h1 className={`${styles.title}`}>{t("account")}</h1>
        {user && selectedLanguage &&
        (
          <>
          <div key={user.id} className={`${styles.box}`}>
          <div className={`${styles.boxChild} row`}>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)', paddingBottom:'1vh' }} />
            <h3 className={`${styles.boxChildTitle} col-7`}>Email: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>{user.email}</span></h3>
            <Link className={`${styles.link} col`}  to={'/ChangeEmail'}>{t("changeEmail")}</Link>
          </div>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>{t("password")}: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>********</span></h3>
            <Link className={`${styles.link} col`}  to={'/ChangePassword'}>{t("changePassword")}</Link>
          </div>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)' }} />
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>Plan: <span style={{fontSize:'3.8vh', color:'rgba(255, 255, 255, 0.704)'}}>{user.plan}</span></h3>
            <Link className={`${styles.link} col`} to={'/ChangePlan'}>{t("changePlan")}</Link>
          </div>
          <hr className="col-12" style={{ marginLeft:'-14vh' ,borderTop: '1px solid rgba(255, 255, 255, 0.704)' }} />
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>{t("language")}: </h3>
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
        )
        }
      </div>
    </>
  )
}

export default ManageAccount