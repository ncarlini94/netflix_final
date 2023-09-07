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
    const [loading, setLoading] = useState(true);



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
            setLoading(false)
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


if (loading) {
  return <div className={`${styles.loader_container}`}></div>;
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
          <hr className={`${styles.bar} col-12`}/>
            <h3 className={`${styles.boxChildTitle} col-7`}>Email: <span className={`${styles.boxChildText}`}>{user.email}</span></h3>
            <Link
            className={`${styles.link} col`}  to={'/ChangeEmail'}>
            {t("changeEmail")}
            </Link>
          </div>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>{t("password")}: <span className={`${styles.boxChildText}`}>********</span></h3>
            <Link
            className={`${styles.link} col`}
            to={'/ChangePassword'}>
            {t("changePassword")}
            </Link>
          </div>
          <hr className={`${styles.bar} col-12`}/>
          <div className={`${styles.boxChild} row`}>
            <h3
              className={`${styles.boxChildTitle} col-7`}>
              Plan: <span className={`${styles.boxChildText}`}>{user.plan}
              </span>
            </h3>
            <Link
            className={`${styles.link} col`}
            to={'/ChangePlan'}>{t("changePlan")}
            </Link>
          </div>
          <hr className={`${styles.bar} col-12`}/>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-7`}>{t("language")}: </h3>
            <select
              className={`${styles.selectedForm} form-select col`}
              value={i18n.language}
              onChange={changeLanguage}
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