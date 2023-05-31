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
            quality={"backdropw1280"}
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
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={"Series Populares"}
        />
        </>
    )

    }


export default Home;