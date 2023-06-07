import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";

const MoviePage = () => {


    return(
        <>
        <Banner
            entity={"movies"}
            state={"popular"}
            language={"english"}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"popular"}
            language={"spanish"}
            title={"Peliculas Populares"}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={"Pëliculas Rankeadas"}
            quality={"backdropw500"}
        />
        </>
    )

    }


export default MoviePage;