import React from "react";
import Card from "../Card/Card"
import Slider from "react-slick";
import useApi from "../../hooks/useApi";
import { settingsSlider } from "./Settings";
import apiNetflix from "../../utils/endPointApi";


const Carousel = ({entity, state, language, title}) => {

    const [values] = useApi(entity, state, language)

    return(
        <>
        <div className="container-fluid">
            <div className="">
                <h1 style={{color:"rgba(188, 188, 188, 0.8)"}}>
                    {title}
                </h1>
            </div>
            <Slider {...settingsSlider}>
                {
                    values.map((value) => (
                        <Card
                        entity={entity}
                        id= {value.id}
                        key= {value.id}
                        language= {language}
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


export default Carousel;