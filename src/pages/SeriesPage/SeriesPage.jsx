import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";

const Series = () => {



    return(
        <>
        <Banner
            entity={"series"}
            state={"popular"}
            language={"english"}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={"Series Populares"}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={"Series Rankeadas"}
            quality={"backdropw500"}
        />
        </>
    )

    }


export default Series;