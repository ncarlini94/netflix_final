import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../../contexts/ProfileContext';
import { auth, firestore } from '../../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const ProfileSetting = () => {

    const navigate = useNavigate()
    const {selectedProfile} = useContext(ProfileContext);
      const [user, setUser] = useState(null);
    const [name, setName] = useState(selectedProfile?.name || '');
    const [avatar, setAvatar] = useState(selectedProfile?.avatar || '');


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
            getUserProfiles();

    }, []);


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




  return (
    <>
        <div className='ps-5 pt-5'>
        <h2>Configuración del perfil</h2>
        <div>
          <label>Avatar:</label>
          <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className='btn btn-primary' onClick={saveChanges}>Guardar</button>
      </div>
    </>
  )
}

export default ProfileSetting