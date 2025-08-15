    import { useEffect, useState } from "react";
    import { useLocation, useParams } from "react-router";
    import apiBuilder from "../../hooks/getApi";
    import ErrorVideo from '../../assets/imagen/Error.jpg'
    import styles from './VideoCard.module.css'
    import ReactPlayer from 'react-player'


    const VideoCard = ({ language}) => {

        const { type, id } = useParams()
        const [video, setVideo] = useState({})
        const location = useLocation()
        const [isLoading, setIsLoading] = useState(true);


        useEffect(() => {
            const getVideo = async () => {
                const mediaType = location.state.entity === "series" ? "series" : "movies";
                const res = await apiBuilder.tryGetVideo(mediaType, id, language)
                if(res instanceof Error) {
                    console.log(res.messange)
                } else {
                    setVideo(res)
                    setIsLoading(false)
                }
            }
            getVideo()
        }, [type, id, language, location.state.entity])
    return(
        <>
        {
        isLoading ? (<div className={`${styles.loader_container}`}></div>) :
        !video ? (
            <div
                className={`${styles.error}`}
                style={{
                    backgroundImage:`url(${ErrorVideo})`
                    }}>
                    <div className={`${styles.banner_gradient}`}>
                <h4
                className={`${styles.textError}`}
                >Lamentablemente, el video que buscas no se encuentra disponible en este momento. Sin embargo, aquí tienes algunas recomendaciones.</h4>
                </div>
            </div>
            ) :
        (
        <div className={`container-fluid ${styles.boxVideo}`}>
        <ReactPlayer
        className={`${styles.reactPlayer}`}
        src={`https://www.youtube.com/watch?v=${video.key}`}
        width='100%'
        height='100%'
        controls={true}
        playing={true}
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