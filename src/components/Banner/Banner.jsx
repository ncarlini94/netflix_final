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


useEffect(() => {
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

    <div className={styles.banner_gradient}>
        <div className={styles.banner_title}>
        <h1>{loading ? "Loading..." : randomValue?.title}</h1>
        </div>

        <div>
        <h2>{loading ? "Loading..." : randomValue?.overview}</h2>
        </div>
            <div className={styles.banner_buttons}>
            <button className={styles.banner_button}>MAS INFORMACION</button>
            <Link to={`/MovieDetailPage/${randomValue.id}`}><button className={styles.banner_button}>REPRODUCIR</button></Link>
        </div>
    </div>
    </div>
    </>
);
};

export default Banner;