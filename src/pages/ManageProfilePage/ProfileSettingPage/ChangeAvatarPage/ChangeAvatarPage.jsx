import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../../assets/imagen/avatares/avatar.jpg';
import avatar1 from '../../../../assets/imagen/avatares/avatar1.jpg';
import avatar2 from '../../../../assets/imagen/avatares/avatar2.jpg';
import avatar3 from '../../../../assets/imagen/avatares/avatar3.jpg';
import avatar4 from '../../../../assets/imagen/avatares/avatar4.jpg';
import avatar5 from '../../../../assets/imagen/avatares/avatar5.jpg';


const ChangeAvatarPage = () => {
  const navigate = useNavigate();
  const avatars = [avatar, avatar1, avatar2, avatar3, avatar4, avatar5];

  const handleAvatarClick = (selectedAvatar) => {
    navigate('/ProfileSetting', { state: { avatar: selectedAvatar } });
  };

  return (
    <>
    <div style={{marginLeft:'20vh', marginTop:'15vh'}}>
      <h2>Selecciona un avatar</h2>
      {avatars.map((avatar, index) => (
        <img
        style={{maxWidth:'15vh', margin:'2vh'}}
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          onClick={() => handleAvatarClick(avatar)}
        />
      ))}
      </div>
    </>
  );
};

export default ChangeAvatarPage;
