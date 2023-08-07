import React, { useContext, useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';
import styles from './ProfilesPage.module.css'
import { useTranslation } from 'react-i18next';

const ProfilesPage = () => {

  const { i18n } = useTranslation();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { setSelectedProfile } = useContext(ProfileContext);

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserProfiles();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleProfileSelect = (profile) => {
    if(user){
    i18n.changeLanguage(user.language)
    setSelectedProfile(profile);
    localStorage.setItem('profile', JSON.stringify(profile))
    }
  };


  if (!user && !location.state) {
    return <div className={`${styles.loader_container}`}></div>;
  }


  if (location.state && location.state.profile ) {
    const { avatar, name } = location.state.profile;
    return (
      <>
      <div className={`${styles.box} row`} style={{paddingLeft:'5em'}}>
      <div key={location.state.key} className={`${styles.boxProfile} col`} >
        <Link to={'/Home'} onClick={() => handleProfileSelect(location.state.profile)}>
          <img src={`${avatar}`} className={`${styles.avatar} navbar-toggler-icon`} alt="Avatar" style={{marginLeft:'-1.3em'}} />
        </Link>
        <h3 className="pt-4">{name}</h3>
      </div>
      </div>
      </>
    );
  }

  return (
    <>
    <div className={`${styles.box} row`}>
      {user.profiles.map((profile) => (
        <div key={profile.id} className={`${styles.boxProfile} col`}>
          <Link to={'/Home'} onClick={() => handleProfileSelect(profile)}>
            <img src={`${profile.avatar}`} className={`${styles.avatar} navbar-toggler-icon`} alt="Avatar"/>
          </Link>
          <h3 className={`${styles.name}`}>{profile.name}</h3>
        </div>
      ))}
      </div>
    </>
  );
};

export default ProfilesPage;