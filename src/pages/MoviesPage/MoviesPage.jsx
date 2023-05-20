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
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"popular"}
            language={"spanish"}
            title={"Peliculas Populares"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={"Pëliculas Rankeadas"}
        />
        </>
    )

    }


export default MoviePage;