import React from "react";
import Card from "../Card/Card"
import Slider from "react-slick";
import useApi from "../../hooks/useApi";
import { settingsSlider } from "./Settings";
import styles from "./Carrousel.module.css";


const Carousel = ({entity, state, language, title, quality}) => {

    const [values] = useApi(entity, state, language)

    return(
        <>
        <div className="container-fluid">
            <div>
                <h1 className={`${styles.titleCarrousel}`}>
                    {title}
                </h1>
            </div>
            <Slider {...settingsSlider}>
                {
                    values
                    .filter((value) => value.backdrop_path || value.poster_path)
                    .map((value) => (
                        <Card
                        entity={entity}
                        id= {value.id}
                        key= {value.id}
                        language= {language}
                        title= {value.title || value.name}
                        imgPath= {value.backdrop_path || value.poster_path}
                        quality= {quality}
                        value= {value}
                        />
                    ))
                }
            </Slider>
            </div>
        </>
    )


}


export default Carousel;