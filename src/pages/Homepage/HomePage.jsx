import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";
import { useTranslation } from "react-i18next";

const Home = () => {

    const {t, i18n} = useTranslation()

    const getLanguageName = (languageCode) => {
        if (languageCode === "es") {
            return "spanish";
        } else if (languageCode === "en") {
            return "english";
        } else {
            return languageCode;
        }
    };

    const language = getLanguageName(i18n.language);



    return(
        <>
        <Banner
            entity={"movies"}
            state={"popular"}
            language={language}
            quality={"backdropw1280"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"movies"}
            state={"popular"}
            language={language}
            title={t('opularMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"30px"}/>
        <Carousel
            entity={"series"}
            state={"popular"}
            language={language}
            title={t('popularAeries')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={language}
            title={t('upcomingMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={language}
            title={t('TopRatedMovies')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={language}
            title={t('topRatedSeries')}
            quality={"backdropw1280"}
        />
        </>
    )

    }


export default Home;