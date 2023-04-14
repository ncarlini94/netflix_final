import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import apiBuilder from "../../hooks/getApi";
import { Link } from "react-router-dom";

const Card = ({title, imgPath, quality, id}) => {

    const [img, setImg] = useState(null);

    useEffect(() => {
        const url = apiBuilder.tryGetImg(imgPath, quality = "backdropw500")
        setImg(url)
    }, [imgPath])

    return(
        <>
        <Link to={`MovieTrailerPage/${id}`}>
        <div
        style={{
            backgroundImage: `url(${img})`
        }}
        className={styles.card}
        >
            <h1 className={styles.card_title}>{title}</h1>
        </div>
        </Link>
        </>
    )
}


export default Card;