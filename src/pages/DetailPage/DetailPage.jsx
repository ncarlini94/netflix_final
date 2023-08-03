import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from './DetailPage.module.css';
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import apiBuilder from "../../hooks/getApi";
import Card from "../../components/Card/Card";
import Slider from "react-slick";
import { settingsSlider } from "../../components/Carousel/Settings";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ProfileContext } from "../../contexts/ProfileContext";
import { firestore, auth } from '../../firebase/config';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { useTranslation } from 'react-i18next'


const DetailPage = () => {

  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const [similar, setSimilar] = useState([]);
  const { selectedProfile, setSelectedProfile } = useContext(ProfileContext);
  const [user, setUser] = useState(null);


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

  const isMovieInFavorites = () => {
    if (!selectedProfile || !selectedProfile.favorites) {
      return false;
    }
    const movieId = location.state.value.id;
    return selectedProfile.favorites.some((movie) => movie.id === movieId);
  };


  const addToFavorites = async () => {
    try {
      const movieData = { ...location.state.value, entity: location.state.entity };
      const movieId = movieData.id;
      const updatedProfile = { ...selectedProfile };
      const movieIndex = updatedProfile.favorites.findIndex(
        (movie) => movie.id === movieId
      );
      if (movieIndex !== -1) {
        updatedProfile.favorites.splice(movieIndex, 1);
        setSelectedProfile(updatedProfile);
        await updateDoc(doc(firestore, 'NetflixUsers', auth.currentUser.email), {
          profiles: user.profiles.map((profile) => {
            if (profile.id === selectedProfile.id) {
              return updatedProfile;
            } else {
              return profile;
            }
          }),
        });
        console.log('Movie removed from favorites successfully');
      } else {
        updatedProfile.favorites.push(movieData);
        setSelectedProfile(updatedProfile);
        await updateDoc(doc(firestore, 'NetflixUsers', auth.currentUser.email), {
          profiles: user.profiles.map((profile) => {
            if (profile.id === selectedProfile.id) {
              return updatedProfile;
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
        location.state.entity,
        id,
        location.state.language
      );
      if (res instanceof Error) {
        console.log(res.messange);
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
          <button className={styles.banner_button_play}>
            <IoPlay style={{width:'3.5vh',height:'3.5vh',marginBottom:'0.4vh', marginRight:'1vh'}}/>REPRODUCIR</button></Link>
          <div className={`${styles.title}`}>
            <h1>{location.state.value.title || location.state.value.original_name}</h1>
          </div>
          <div className={`${styles.Overview}`}>
            <h4>{location.state.value.overview}</h4>
          </div>
          <div className={`${styles.detailBox} row`}>
          <button  className={`${styles.btnFav} btn btn-primary`} onClick={addToFavorites}>
              {isMovieInFavorites() ? (
                <BsHeartFill/>
              ) : (
                <BsHeart/>
              )}
            </button>
            <h4 className="col">{t("language")}: {location.state.value.original_language}</h4>
            <h4 className="col-3">{t("classification")}: ☆ {location.state.value.vote_average}</h4>
            <h4 className="col-6">{t("releaseDate")}: {location.state.value.release_date}</h4>
          </div>
          </div>
        </div>
      </div>
      <div className={`${styles.similar}`}>
        <Slider {...settingsSlider}>
          {similar.map((value) => (
            <Card
              entity={location.state.entity}
              title={value.title || value.name}
              imgPath={value.backdrop_path || value.poster_path}
              quality={"backdropw500"}
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
