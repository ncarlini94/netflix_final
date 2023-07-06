import React, { useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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
      <div className='container-fluid ps-5 pt-5'>
        {user &&
        [
          <>
            <h1>Cuenta</h1>
          <div className='account'>
            <h3>Mail: {user.email}</h3>
            <Link>Cambiar email</Link>
            <h3>Contraseña: ********</h3>
            <Link>Cambiar contraseña</Link>
          </div>
          <div className='plan'>
            <h3>{user.plan}</h3>
            <Link>Cambiar de plan</Link>
          </div>
          </>
        ]
        }
      </div>
    </>
  )
}

export default ManageAccount