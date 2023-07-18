import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import apiBuilder from "../../hooks/getApi";
import ErrorVideo from '../../assets/imagen/Error.jpg'
import styles from './VideoCard.module.css'


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
    isLoading ? (<h1>Loading</h1>) :
    !videos ? (
        <div style={{backgroundImage:`url(${ErrorVideo})`, height: "28em", width:"auto", backgroundRepeat: "no-repeat", marginTop:"-3em"}}>
            <h4 style={{color:"white", paddingTop:"6em", paddingLeft:"7em"}}>Ops! no se encuentra el trailer</h4>
        </div>
        ) :
    (
    <div className="container-fluid">
    <iframe className={`${styles.video}`} width="1280" height="613" src={`https://www.youtube.com/embed/${videos.key}`} title={`${videos.name}`} frameBorder="0" allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
    </div>
    )}
    </>
    )


}

export default VideoCard;