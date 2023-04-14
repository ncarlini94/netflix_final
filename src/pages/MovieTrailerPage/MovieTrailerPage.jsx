import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiBuilder from "../../hooks/getApi";

const MovieDetail = (entity, language) => {

    const { type, id } = useParams()
    const [videos, setVideos] = useState({})

const getVideo = async () => {
    const res = await apiBuilder.tryGetVideo(entity = "movies", id, language = "english")
    console.log(res)
    if(res instanceof Error) {
        console.log(res.messange)
    } else {
        setVideos(res)
    }
}

    useEffect(() => {
        getVideo()
    }, [type, id])

    console.log(videos)


    return(
        <>
            <div className="container">
            <iframe width="1060" height="535" src={`https://www.youtube.com/embed/${videos.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true"></iframe>
            </div>
        </>
    )
    }


export default MovieDetail;