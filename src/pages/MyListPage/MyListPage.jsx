import React from 'react'
import Slider from 'react-slick';
import { settingsSlider } from './Settings';
import Card from '../../components/Card/Card';
import styles from './MyListPage.module.css'
import { useTranslation } from 'react-i18next'

const MyListPage = () => {

  const { t } = useTranslation();
  const storedProfile = JSON.parse(localStorage.getItem('profile'));


  if (!storedProfile || !storedProfile.favorites) {
    return <div>Loading...</div>
  }



  return (
    <>
    <div className={`${styles.ListBox}`}>
    <h2 className={`${styles.Title}`}>{t('favorites')}</h2>
    <Slider {...settingsSlider}>
    {storedProfile.favorites.map((value) => (
      <Card
        entity={value.entity}
        title={value.title || value.name}
        imgPath={value.backdrop_path || value.poster_path}
        quality={"backdropw500"}
        id={value.id}
        value={value}
        key={value.id}
        language={'español'}
      />
    ))}
  </Slider>
  </div>
  </>
  )
}

export default MyListPage