import React, { useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from './ManageAccount.module.css';

const ManageAccount = () => {

    const [user, setUser] = useState(null);

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



  return (
    <>
      <div className='container ps-5 pt-5'>
        {user &&
        [
          <>
            <h1 className={`${styles.title}`}>Cuenta</h1>
          <div key={user.id} className={`${styles.box}`}>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-8`}>Mail: {user.email}</h3>
            <Link className={`${styles.link} col`}  to={'/ChangeEmail'}>Cambiar email</Link>
          </div>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-8`}>Contraseña: ********</h3>
            <Link className={`${styles.link} col`}  to={'/ChangePassword'}>Cambiar contraseña</Link>
          </div>
          <div className={`${styles.boxChild} row`}>
            <h3 className={`${styles.boxChildTitle} col-8`}>Plan: {user.plan}</h3>
            <Link className={`${styles.link} col`} to={'/ChangePlan'}>Cambiar de plan</Link>
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