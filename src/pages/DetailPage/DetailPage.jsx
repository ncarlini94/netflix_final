import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from './DetailPage.module.css';
import { FiPlayCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import apiBuilder from "../../hooks/getApi";
import Card from "../../components/Card/Card";
import apiNetflix from "../../utils/endPointApi";
import Slider from "react-slick";
import { settingsSlider } from "../../components/Carousel/Settings";

const DetailPage = () => {

    const { id } = useParams()
    const location = useLocation()
    const [similar, setSimilar] = useState([])

    useEffect(() => {
        getSimilar()
        },[])

    const getSimilar = async () => {
        const res = await apiBuilder.tryGetSimilar(location.state.entity, id, location.state.language)
        if(res instanceof Error) {
            console.log(res.messange)
        } else {
            setSimilar(res)
        }
    }

    console.log(location)

    return(
        <>
            <div
                className={`${styles.MovieBackground}`}
                style={{backgroundImage: `url(${location.state.img})`}}>
                <div className={`${styles.background_gradient}`}>
                        <Link to={{pathname:`/Trailer/${id}`}} state={{entity:location.state.entity}}>
                        <IconContext.Provider value={{ className:`${styles.iconplay}`}}>
                        <FiPlayCircle/>
                        </IconContext.Provider>
                        </Link>
                    <div  className={`${styles.Overview}`}>
                        <h4>{location.state.value.overview}</h4>
                    </div>
                </div>
            </div>
                <div className={`${styles.similar}`}>
                    <Slider {...settingsSlider}>
                        {
                        similar.map((value) => (
                            <Card
                            entity={location.state.entity}
                            id= {value.id}
                            key= {value.id}
                            title= {value.title || value.name}
                            imgPath= {value.backdrop_path || value.poster_path}
                            quality= {apiNetflix.quality.backdropw500}
                            value= {value}
                            />
                        ))
                        }
                        </Slider>
                    </div>
        </>
    )

    }


export default DetailPage;