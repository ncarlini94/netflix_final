import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../../assets/imagen/avatares/avatar.jpg';
import avatar1 from '../../../../assets/imagen/avatares/avatar1.jpg';
import avatar2 from '../../../../assets/imagen/avatares/avatar2.jpg';
import avatar3 from '../../../../assets/imagen/avatares/avatar3.jpg';
import avatar4 from '../../../../assets/imagen/avatares/avatar4.jpg';
import avatar5 from '../../../../assets/imagen/avatares/avatar5.jpg';
import avatar6 from '../../../../assets/imagen/avatares/avatar6.jpg';
import { useTranslation } from 'react-i18next';


const ChangeAvatarPage = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const avatars = [avatar, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  const handleAvatarClick = (selectedAvatar) => {
    navigate('/ProfileSetting', { state: { avatar: selectedAvatar } });
  };

  return (
    <>
    <div style={{marginLeft:'34vh', marginTop:'15vh', maxWidth:'60em'}}>
      <h4 style={{color:'rgba(225,225,225,0850)', fontSize:'4.4vh'}}>{t('SelectAvatar')}</h4>
      <div
      style={{
        marginLeft:'4vh',
        marginTop:'2vh'
      }}>
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
      </div>
    </>
  );
};

export default ChangeAvatarPage;
