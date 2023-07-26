import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { auth, firestore } from '../../../firebase/config';
import Avatar from '../../../assets/imagen/avatares/avatar.jpg'

const AddProfilesPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [avatar] = useState(location.state?.avatar || Avatar);

    useEffect(() => {
        const getUserProfiles = async () => {
          try {
            const q = query(collection(firestore, 'NetflixUsers'), where('id', '==', auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
          } catch (error) {
            console.error('Error retrieving users: ', error);
          }
        };
        getUserProfiles()
}, []);

    const saveChanges = async () => {
        const userRef = doc(firestore, 'NetflixUsers', user.email.toLowerCase());

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const newProfile = {
              name: name,
              avatar: avatar,
              favorites: [],
              id: Math.random().toString(36).substr(2, 9),
            };
            userData.profiles.push(newProfile);
            await updateDoc(userRef, userData);
            console.log('Cambios guardados en Firestore.');
            navigate('/Profiles');
          } else {
            console.error('El documento del usuario no existe.');
          }
        } catch (error) {
          console.error('Error al guardar los cambios en Firestore:', error);
        }
      };
      


      const handleAvatarChange = () => {
        navigate('/SelectAvatar');
      };
      
      
        return (
          <>
              <div className='container'>
              <h2 style={{marginTop:'10vh', color:'rgb(255,255,255)'}}>Configuración del perfil</h2>
              <div>
                <img
                  style={{maxWidth:'15vh', marginBottom:'2vh'}}
                  src={`${avatar}`}
                  alt='avatar'
                  onClick={handleAvatarChange}></img>
              </div>
              <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <button className='btn btn-danger mt-2' onClick={saveChanges}>Guardar</button>
            </div>
          </>
        )
      }

export default AddProfilesPage