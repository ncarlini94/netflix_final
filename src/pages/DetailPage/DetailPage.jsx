import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from './DetailPage.module.css';
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import apiBuilder from "../../hooks/getApi";
import Card from "../../components/Card/Card";
import Slider from "react-slick";
import { settingsSlider } from "../../components/Carousel/Settings";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore, auth } from '../../firebase/config';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { useTranslation } from 'react-i18next'


const DetailPage = () => {

  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const [similar, setSimilar] = useState([]);
  const storedProfile = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(null);
  const scrollToX = 0;
  const scrollToY = 0;

  useEffect(() => {
    window.scrollTo(scrollToX, scrollToY);
  }, [location, scrollToX, scrollToY]);

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
    getUserProfiles()
  }, []);

  const getEntity = (entity) => {
    return entity === "movie" ? "movies" : entity === "tv" ? "series" : entity;
  };

  const isMovieInFavorites = () => {
    if (!storedProfile || !storedProfile.favorites) {
      return false;
    }
    const movieId = location.state.value.id;
    return storedProfile.favorites.some((movie) => movie.id === movieId);
  };

  const [isFavorite, setIsFavorite] = useState(isMovieInFavorites());


  const addToFavorites = async () => {
    try {
      const movieData = { ...location.state.value, entity: getEntity(location.state.entity) };
      const updatedProfile = { ...storedProfile };
      const movieId = location.state.value.id;
      const movieIndex = updatedProfile.favorites.findIndex((movie) => movie.id === movieId);
      if (movieIndex !== -1) {
        const updatedFavorites = updatedProfile.favorites.filter((movie) => movie.id !== movieId);
        updatedProfile.favorites = updatedFavorites;
        setIsFavorite(false);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        await updateDoc(doc(firestore, 'NetflixUsers', auth.currentUser.email), {
          profiles: user.profiles.map((profile) => {
            if (profile.id === storedProfile.id) {
              return { ...updatedProfile };
            } else {
              return profile;
            }
          }),
        });
        console.log('Movie removed from favorites successfully');
      } else {
        updatedProfile.favorites.push(movieData);
        setIsFavorite(true);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        await updateDoc(doc(firestore, 'NetflixUsers', auth.currentUser.email), {
          profiles: user.profiles.map((profile) => {
            if (profile.id === storedProfile.id) {
              return { ...updatedProfile };
            } else {
              return profile;
            }
          }),
        });
        console.log('Movie added to favorites successfully');
      }
    } catch (error) {
      console.error('Error adding/removing movie to/from favorites:', error);
    }
  };



  useEffect(() => {
    const getSimilar = async () => {
      const res = await apiBuilder.tryGetSimilar(
        getEntity(location.state.entity),
        id,
        location.state.language
        );
      if (res instanceof Error) {
        console.log(res.message);
      } else {
        setSimilar(res);
      }
    };
    getSimilar();
  }, [id, location.state.entity, location.state.language]);

  return (
    <>
      <div
        className={`${styles.MovieBackground}`}
        style={{ backgroundImage: `url(${location.state.img})` }}
      >
        <div className={`${styles.background_gradient}`}>
        <div className={`${styles.box}`}>
          <Link
            to={{ pathname: `/Trailer/${id}` }}
            state={{ entity: location.state.entity }}
            className={`${styles.iconplay}`}
          >
          <button className={`${styles.banner_button_play}`}>
            <IoPlay className={styles.iconPlay}/>{t('play')}</button></Link>
          <div className={`${styles.title}`}>
            <h1>{location.state.value.title || location.state.value.original_name}</h1>
          </div>
          <div className={`${styles.Overview}`}>
            <h4>{location.state.value.overview}</h4>
          </div>
          <button  className={`${styles.btnFav} btn btn-primary`} onClick={addToFavorites}>
              {isFavorite ? (
                <BsHeartFill/>
              ) : (
                <BsHeart/>
              )}
            </button>
            <h4
            className={`${styles.language}`}>
            {t("language")}: {location.state.value.original_language}
            </h4>
            <h4
            className={`${styles.classification}`}>
            {t("classification")}: ☆ {location.state.value.vote_average}
            </h4>
            <h4
            className={`${styles.releasDate}`}>
            {t("releaseDate")}: {location.state.value.release_date}
            </h4>
          </div>
          </div>
        </div>
      <div className={`${styles.similar}`}>
        <Slider {...settingsSlider}>
          {similar
          .filter((value) => value.backdrop_path && value.poster_path)
          .map((value) => (
            <Card
              entity={location.state.entity}
              title={value.title || value.name}
              imgPath={value.backdrop_path}
              quality={"backdropw1280"}
              id={value.id}
              value={value}
              key={value.id}
              language={location.state.language}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default DetailPage;
