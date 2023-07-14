import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../../contexts/ProfileContext';
import { auth, firestore } from '../../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router';

const ProfileSetting = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const {selectedProfile} = useContext(ProfileContext);
    const [user, setUser] = useState(null);
    const [name, setName] = useState(selectedProfile?.name || '');
    const [avatar, setAvatar] = useState(selectedProfile?.avatar || '');


    useEffect(() => {
      if (location.state && location.state.avatar) {
        setAvatar(location.state.avatar);
      }
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
            getUserProfiles();
    }, [location.state]);


    const saveChanges = async () => {
        const profileRef = doc(firestore, 'NetflixUsers', user.email);
        try {
          await updateDoc(profileRef, {
            profiles: [
              {
                ...selectedProfile,
                name: name,
                avatar: avatar,
              },
            ],
          });
          console.log('Cambios guardados en Firestore.');
          navigate('/Profiles')
        } catch (error) {
          console.error('Error al guardar los cambios en Firestore:', error);
        }
      };

const handleAvatarChange = () => {
  navigate('/Avatar');
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

export default ProfileSetting