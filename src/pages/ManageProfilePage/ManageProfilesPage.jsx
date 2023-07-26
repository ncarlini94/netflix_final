import React, { useContext, useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';
import styles from './ManageProfilesPage.module.css'
import { AiFillPlusSquare } from 'react-icons/ai';

const ManageProfilePage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { setSelectedProfile } = useContext(ProfileContext);
  const hasMaxProfiles = user?.profiles?.length >= 5;

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
    setSelectedProfile(profile);
  };

  if (!user && !location.state) {
    return <div className={`${styles.loader_container}`}></div>;
  }

  if (location.state && location.state.profile ) {
    const { avatar, name } = location.state.profile;
    return (
      <div key={location.state.key} className="container-fluid" style={{ paddingTop: '20vh', paddingLeft: '20vh' }}>
        <Link to={'/ProfileSetting'}>
          <img src={`${avatar}`} className="navbar-toggler-icon" alt="Avatar" style={{ width: '20vh', height: '20vh' }} />
        </Link>
        <h3 className="pt-4">{name}</h3>
      </div>
    );
  }


  return (
    <>
    <div className={`${styles.box} row`}>
      {user.profiles.map((profile) => (
        <div key={profile.id} className={`${styles.boxProfile} col`} style={{}}>
          <Link to={'/ProfileSetting'} onClick={() => handleProfileSelect(profile)}>
            <img src={`${profile.avatar}`} className={`${styles.avatar} navbar-toggler-icon`} alt="Avatar"/>
          </Link>
          <h3 className={`${styles.name}`}>{profile.name}</h3>
        </div>
      ))}
      {!hasMaxProfiles && (
        <div className={`${styles.boxProfile} col`}>
          <Link to={'/AddProfile'} style={{textDecoration:'none'}}>
          <div>
          <AiFillPlusSquare className={`${styles.icon}`}/>
          <h4 className={`${styles.name}`}>Agregar</h4>
          </div>
          </Link>
        </div>
      )}
      </div>
    </>
  );
};

export default ManageProfilePage