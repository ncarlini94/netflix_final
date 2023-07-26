import React from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useLocation, useParams } from "react-router";
import styles from './TrailerPage.module.css'
import { useEffect } from "react";
import { useState } from "react";
import apiBuilder from "../../hooks/getApi";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import { settingsSlider } from "../../components/Carousel/Settings";


const TrailerPage = () => {

    const { id } = useParams();
    const location = useLocation()
    const [similar, setSimilar] = useState([]);

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

    return(
        <>
            <div className={`${styles.MovieBackground}`}>
                <VideoCard
                    entity={location.state}
                    language={"spanish"}
                />
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
            </div>
        </>
    )
    }


export default TrailerPage;