import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Separator from "../../components/Separator/Separator"
import Banner from "../../components/Banner/Banner";
import { useTranslation } from "react-i18next";

const Series = () => {

 const { t } = useTranslation()

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
            title={t('popular')}
            quality={"backdropw1280"}
        />
        <Separator height={"40px"}/>
        <Carousel
            entity={"series"}
            state={"topRated"}
            language={"spanish"}
            title={t('topRanked')}
            quality={"backdropw1280"}
        />
        </>
    )

    }


export default Series;