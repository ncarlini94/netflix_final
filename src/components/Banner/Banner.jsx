import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import apiBuilder from "../../hooks/getApi";
import { randomIndex } from '../../utils/Utils';
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";

const Banner = ({entity, state, language, quality}) => {

    const [values, loading] = useApi(entity, state, language)


    const [randomValue, setRandomValue] = useState([])
    const [randomImg, setRandomImg] = useState([]);



    useEffect(() => {
    const getRandomValue = async () => {
        if (values.length === 0) {
            }else{
                const selectedValue = values[randomIndex(0, values.length -1)];
                setRandomValue(selectedValue)
        const backgroundImage = apiBuilder.tryGetImg(
            selectedValue.backdrop_path,
            quality= "backdropw1280"
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

    <div className={styles.banner_info}>
        <div className={styles.banner_title}>
        <h1>{loading ? "Loading..." : randomValue?.title || randomValue.name}</h1>
        </div>

        <div className={styles.banner_description}>
        <h2>{loading ? "Loading..." : randomValue?.overview}</h2>
        </div>

            <div className={`${styles.banner_buttons}`}>
            <Link to={`/Trailer/${randomValue.id}`} state={{entity, value: randomValue, img: randomImg}}><button className={styles.banner_button}>REPRODUCIR</button></Link>
            <Link to={`/Detail/${randomValue.id}`} state={{entity, value: randomValue, img: randomImg}}><button className={styles.banner_button}>MAS INFORMACION</button></Link>
        </div>
        </div>
        </div>
    </div>
    </>
);
};

export default Banner;