import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import apiBuilder from "../../hooks/getApi";
import { Link } from "react-router-dom";

const Card = ({entity, title, imgPath, quality, id, value, language}) => {

    const [img, setImg] = useState(null);



    useEffect(() => {
        const url = apiBuilder.tryGetImg(imgPath, quality = "backdropw1280")
        setImg(url)
    }, [imgPath, entity])

    return(
        <>
        <div
        style={{
            backgroundImage: `url(${img})`
        }}
        className={styles.card}
        >
        <Link to={{pathname:`/Detail/${id}`}} state={{entity: entity, language:language, value:value, img: img}}>
            <h1 className={styles.card_title}>{title}</h1>
        </Link>
        </div>
        </>
    )
}


export default Card;