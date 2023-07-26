import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";

const Home = () => {



    return(
        <>
        <Banner
            entity={"movies"}
            state={"popular"}
            language={"spanish"}
            quality={"posterw1280"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"movies"}
            state={"popular"}
            language={"spanish"}
            title={"Peliculas Populares"}
            quality={"backdropw1280"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={"Series Populares"}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={"spanish"}
            title={"Proximas Peliculas"}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={"Peliculas mejor clasificadas"}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={"Series mejor clasificadas"}
            quality={"backdropw1280"}
        />
        </>
    )

    }


export default Home;