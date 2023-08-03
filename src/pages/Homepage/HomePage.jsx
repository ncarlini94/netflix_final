import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";
import { useTranslation } from "react-i18next";

const Home = () => {

    const {t} = useTranslation()


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
            title={t('opularMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={"spanish"}
            title={t('popularAeries')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={"spanish"}
            title={t('upcomingMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={t('TopRatedMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={t('topRatedSeries')}
            quality={"backdropw1280"}
        />
        </>
    )

    }


export default Home;