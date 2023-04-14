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
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={"Series Populares"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={"Series Rankeadas"}
        />
        </>
    )

    }


export default Series;