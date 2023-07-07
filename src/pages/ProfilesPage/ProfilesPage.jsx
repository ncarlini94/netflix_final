import React, { useContext, useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';

const ProfilesPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { setSelectedProfile } = useContext(ProfileContext);

  useEffect(() => {
    console.log(location)
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
    return <div>Cargando perfiles...</div>;
  }

  if ( location.state.profile ) {
    const { avatar, name } = location.state.profile;
    return (
      <div key={location.state.key} className="container-fluid" style={{ paddingTop: '20vh', paddingLeft: '20vh' }}>
        <Link to={'/Home'} onClick={() => handleProfileSelect(location.state.profile)}>
          <img src={`${avatar}`} className="navbar-toggler-icon" alt="Avatar" style={{ width: '20vh', height: '20vh' }} />
        </Link>
        <h3 className="pt-4">{name}</h3>
        <Link>Editar perfil</Link>
      </div>
    );
  }

  if (!user) {
    return <div>Cargando perfiles...</div>;
  }

  return (
    <>
      {user.profiles.map((profile) => (
        <div key={profile.id} className="container-fluid" style={{ paddingTop: '20vh', paddingLeft: '20vh' }}>
          <Link to={'/Home'} onClick={() => handleProfileSelect(profile)}>
            <img src={`${profile.avatar}`} className={`navbar-toggler-icon`} alt="Avatar" style={{ width: '20vh', height: '20vh' }} />
          </Link>
          <h3 className="pt-4">{profile.name}</h3>
          <Link>Editar perfil</Link>
        </div>
      ))}
    </>
  );
};

export default ProfilesPage;