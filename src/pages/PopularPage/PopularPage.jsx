import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"

const PopularPage = () => {



    return(
        <>
        <Separator height={"100px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={"spanish"}
            title={"Proximas Peliculas"}
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


export default PopularPage;