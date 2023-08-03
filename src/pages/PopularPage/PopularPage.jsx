import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator";
import { useTranslation } from 'react-i18next'

const PopularPage = () => {

 const { t } = useTranslation()

    return(
        <>
        <Separator height={"100px"}/>
        <Carousel
            entity={"movies"}
            state={"upComing"}
            language={"spanish"}
            title={t('upcomingMovies')}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"movies"}
            state={"topRated"}
            language={"spanish"}
            title={t('TopRatedMovies')}
            quality={"backdropw500"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={t('topRatedSeries')}
            quality={"backdropw500"}
        />
        </>
    )

    }


export default PopularPage;