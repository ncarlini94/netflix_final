import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import apiBuilder from "../../hooks/getApi";


const VideoCard = ({ language}) => {

    const { type, id } = useParams()
    const [videos, setVideos] = useState({})
    const location = useLocation()

const getVideo = async () => {
    const mediaType = location.state.entity === "series" ? "series" : "movies";
    const res = await apiBuilder.tryGetVideo(mediaType, id, language)
    if(res instanceof Error) {
        console.log(res.messange)
    } else {
        setVideos(res)
    }
}

    useEffect(() => {
        getVideo()
    }, [type, id])

return(
    <>
    <div className="container">
    <iframe width="1060" height="535" src={`https://www.youtube.com/embed/${videos.key}`} title={`${videos.name}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
    </div>
    </>
    )


}

export default VideoCard;