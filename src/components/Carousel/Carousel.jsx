import React from "react";
import Card from "../Card/Card"
import Slider from "react-slick";
import useApi from "../../hooks/useApi";
import { settingsSlider } from "./Settings";


const Carousel = ({entity, state, language, title, quality}) => {

    const [values] = useApi(entity, state, language)

    return(
        <>
        <div className="container-fluid">
            <div className="">
                <h1 style={{color:"rgba(200, 200, 220, 0.6)", height:"6vh", fontSize:"5vh", paddingLeft:"2.5vh"}}>
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