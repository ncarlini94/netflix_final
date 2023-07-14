import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from './DetailPage.module.css';
import { FiPlayCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import apiBuilder from "../../hooks/getApi";
import Card from "../../components/Card/Card";
import Slider from "react-slick";
import { settingsSlider } from "../../components/Carousel/Settings";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ProfileContext } from "../../contexts/ProfileContext";
import { firestore, auth } from '../../firebase/config';
import { BsHeartFill } from 'react-icons/bs';

const DetailPage = () => {
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

  const addToFavorites = async () => {
    try {
      const movieData = location.state.value;
      const movieId = movieData.id;
      const updatedProfile = { ...selectedProfile };
      const movieIndex = updatedProfile.favorites.findIndex(
        (movie) => movie.id === movieId
      );
      if (movieIndex !== -1) {
        // La película ya está en favoritos, eliminarla
        updatedProfile.favorites.splice(movieIndex, 1);
        // Actualiza el perfil seleccionado en el contexto
        setSelectedProfile(updatedProfile);
        // Actualiza el documento del usuario en Firestore
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
        // La película no está en favoritos, agregarla
        updatedProfile.favorites.push(movieData);
        // Actualiza el perfil seleccionado en el contexto
        setSelectedProfile(updatedProfile);
        // Actualiza el documento del usuario en Firestore
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
          <Link
            to={{ pathname: `/Trailer/${id}` }}
            state={{ entity: location.state.entity }}
          >
            <IconContext.Provider value={{ className: `${styles.iconplay}` }}>
              <FiPlayCircle />
            </IconContext.Provider>
          </Link>
          <div className={`${styles.title}`}>
            <h1>{location.state.value.title}</h1>
          </div>
          <div className={`${styles.Overview}`}>
            <h4>{location.state.value.overview}</h4>
            <button className="btn btn-primary" onClick={addToFavorites}>
              <BsHeartFill className="mr-2" />
              Add to Favorites
            </button>
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
