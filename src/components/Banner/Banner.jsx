import React, { useEffect, useRef, useState } from "react";
import styles from "./Banner.module.css";
import apiBuilder from "../../hooks/getApi";
import { randomIndex } from '../../utils/Utils';
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { IoPlay } from 'react-icons/io5';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Banner = ({entity, state, language, quality}) => {

    const [values, loading] = useApi(entity, state, language)
    const [randomValue, setRandomValue] = useState([])
    const [randomImg, setRandomImg] = useState([]);
    const qualityRef = useRef(quality)


    useEffect(() => {
        const getRandomValue = async () => {
            if (values.length === 0) {
                }else{
                    const selectedValue = values[randomIndex(0, values.length -1)];
                    setRandomValue(selectedValue)
            const backgroundImage = apiBuilder.tryGetImg(
                qualityRef.current,
                selectedValue.backdrop_path
            );
            setRandomImg(backgroundImage);
            };
        };
        getRandomValue();
}, [values]);



return (
    <>
    <div
    className={`${styles.banner_container}`}
    style={
        loading
        ? { backgroundImage: "none" }
        : {
            backgroundImage: `url(${randomImg})`,
            }
    }
    >

    <div className={`container-fluid ${styles.banner_gradient}`}>

    <div className={`${styles.banner_info}`}>
        <div className={`${styles.banner_title}`}>
        <h1>{loading ? "Loading..." : randomValue?.title || randomValue.name}</h1>
        </div>

        <div className={`${styles.banner_description}`}>
        <h2>{loading ? "Loading..." : randomValue?.overview}</h2>
        <h4 className={`${styles.rate}`}>Clasificación: ☆ {randomValue.vote_average}</h4>
        <h4 className={`${styles.relase}`}>Fecha de lanzamiento: {randomValue.release_date}</h4>
        </div>

            <div className={`${styles.banner_buttons}`}>
            <Link to={`/Trailer/${randomValue.id}`} state={{entity, value: randomValue, img: randomImg}}><button className={styles.banner_button_play}><IoPlay className={`${styles.icon}`}/>REPRODUCIR</button></Link>
            <Link to={`/Detail/${randomValue.id}`} state={{entity, value: randomValue, img: randomImg}}><button className={styles.banner_button_info}><AiOutlineInfoCircle className={`${styles.icon}`}/>MAS INFORMACION</button></Link>
            </div>
        </div>
        </div>
    </div>
    </>
);
};

export default Banner;