import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import apiBuilder from "../../hooks/getApi";
import ErrorVideo from '../../assets/imagen/Error.jpg'
import styles from './VideoCard.module.css'
import ReactPlayer from 'react-player/youtube'


const VideoCard = ({ language}) => {

    const { type, id } = useParams()
    const [videos, setVideos] = useState({})
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getVideo = async () => {
            const mediaType = location.state.entity === "series" ? "series" : "movies";
            const res = await apiBuilder.tryGetVideo(mediaType, id, language)
            if(res instanceof Error) {
                console.log(res.messange)
            } else {
                setVideos(res)
                setIsLoading(false)
            }
        }
        getVideo()
    }, [type, id, language, location.state.entity])

return(
    <>
    {
    isLoading ? (<div className={`${styles.loader_container}`}></div>) :
    !videos ? (
        <div style={{
                backgroundImage:`url(${ErrorVideo})`,
                height:"760px",
                width:"1210px",
                backgroundRepeat: "no-repeat",
                marginTop:"4em",
                marginLeft:'5em',
                marginBottom:'-9em',
                }}>
                <div className={`${styles.banner_gradient}`}>
            <h4 style={{
                color:"white",
                fontSize:'1.2em',
                paddingTop:"10em",
                paddingLeft:"10em",
                maxWidth:'35em'
                }}>Lamentablemente, el video que buscas no se encuentra disponible en este momento. Sin embargo, aquí tienes algunas recomendaciones.</h4>
            </div>
        </div>
        ) :
    (
    <div className={`container-fluid ${styles.boxVideo}`}>
    <ReactPlayer
    className={`${styles.reactPlayer}`}
    url={`https://www.youtube.com/embed/${videos.key}`}
    width='100%'
    height='100%'
    controls={true}
    config = {{
        youtube :
            {playerVars :
            {
                showinfo : 0,
                modestbranding: 1,
                rel: 0,
            }
            }
        }
    }
     />
    </div>
    )}
    </>
    )


}

export default VideoCard;