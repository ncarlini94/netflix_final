import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../../../contexts/ProfileContext';
import { auth, firestore } from '../../../firebase/config';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router';
import styles from './ProfileSettingPage.module.css'

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
      try {
        const profileRef = doc(firestore, 'NetflixUsers', user.email.toLowerCase());
        const profileIndex = user.profiles.findIndex(
          (profile) => profile.id === selectedProfile.id
        );
        if (profileIndex === -1) {
          console.error('Perfil seleccionado no encontrado en el array de perfiles.');
          return;
        }
        const updatedProfiles = [...user.profiles];
        updatedProfiles[profileIndex] = {
          ...selectedProfile,
          name: name,
          avatar: avatar,
        };
        await updateDoc(profileRef, {
          profiles: updatedProfiles,
        });
        navigate('/Profiles');
      } catch (error) {
        console.error('Error al guardar los cambios en Firestore:', error);
      }
    };

    const deleteProfile = async () => {
      try {
        if (selectedProfile && user) {
          const updatedProfiles = user.profiles.filter(
            (profile) => profile.id !== selectedProfile.id
          );
          await updateDoc(doc(firestore, 'NetflixUsers', user.email), {
            profiles: updatedProfiles,
          });
          console.log('Perfil eliminado con éxito');
          navigate('/Profiles');
        }
      } catch (error) {
        console.error('Error al eliminar el perfil:', error);
      }
    };

const handleAvatarChange = () => {
  navigate('/Avatar');
};


  return (
    <>
        <div className={`${styles.box} container`}>
        <h2 className={`${styles.title}`} style={{ color:'rgb(255,255,255)'}}>Configuración del perfil</h2>
        <div>
          <img
          className={`${styles.avatar}`}
            style={{maxWidth:'18vh', marginBottom:'2vh'}}
            src={`${avatar}`}
            alt='avatar'
            onClick={handleAvatarChange}></img>
        </div>
        <div>
          <input className={`${styles.inputName} form-control`} type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className={`${styles.btnSave} btn`} onClick={saveChanges}>Guardar</button>
        <button className={`${styles.btnDelet} btn`} onClick={deleteProfile}>Eliminar Perfil</button>
      </div>
    </>
  )
}

export default ProfileSetting