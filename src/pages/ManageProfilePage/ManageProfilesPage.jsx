import React, { useContext, useEffect, useState } from 'react';
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';

const ManageProfilePage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { setSelectedProfile } = useContext(ProfileContext);
  const hasMaxProfiles = user?.profiles?.length >= 5;

  console.log(user?.profiles?.length)

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
    return <div className='ps-5 pt-5' style={{color:'white', fontSize:'4vh'}}>Cargando perfiles...</div>;
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
    <div className='row' style={{maxWidth:'100%'}}>
      {user.profiles.map((profile) => (
        <div key={profile.id} className="container-fluid col" style={{ paddingTop: '20vh', paddingLeft: '20vh' }}>
          <Link to={'/ProfileSetting'} onClick={() => handleProfileSelect(profile)}>
            <img src={`${profile.avatar}`} className={`navbar-toggler-icon`} alt="Avatar" style={{ width: '20vh', height: '20vh' }} />
          </Link>
          <h3 className="pt-4">{profile.name}</h3>
        </div>
      ))}
      {!hasMaxProfiles && (
        <div className="container-fluid col d-flex align-items-center justify-content-center" style={{ paddingTop: '20vh'}}>
          <Link to={'/AddProfile'} style={{ textDecoration: 'none', color: 'rgb(255,255,255)', fontSize: '12vh', paddingBottom:'6vh'}}>+ <h4 style={{fontSize:'3vh', marginLeft:'-1vh'}}>Agregar</h4></Link>
        </div>
      )}
      </div>
    </>
  );
};

export default ManageProfilePage