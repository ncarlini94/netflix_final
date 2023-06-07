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
        <Separator height={"30px"}/>
        <Carousel
            entity={"movies"}
            state={"popular"}
            language={"spanish"}
            title={"Peliculas Populares"}
            quality={"backdropw500"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={"Series Populares"}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={"spanish"}
            title={"Proximas Peliculas"}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={"Peliculas mas votadas"}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={"Series mas votadas"}
            quality={"backdropw500"}
        />
        </>
    )

    }


export default Home;