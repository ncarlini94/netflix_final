import Card from "../Card/Card"
import Slider from "react-slick";
import useApi from "../../hooks/useApi";
import { settingsSlider } from "./Settings";
import styles from "./Carrousel.module.css";


const Carousel = ({entity, state, language, title, quality, page}) => {

    const [values] = useApi(entity, state, language, page='1')

    return(
        <>
            <div>
                <h1 className={`${styles.titleCarrousel}`}>
                    {title}
                </h1>
            </div>
            <Slider {...settingsSlider}>
                {
                    values
                    .filter((value) => value.backdrop_path || value.poster_path)
                    .map((value) => (
                        <Card
                        entity={entity}
                        id= {value.id}
                        key= {value.id}
                        language= {language}
                        title= {value.title || value.name}
                        imgPath= {value.backdrop_path || value.poster_path}
                        quality= {quality}
                        value= {value}
                        />
                    ))
                }
            </Slider>
        </>
    )


}


export default Carousel;