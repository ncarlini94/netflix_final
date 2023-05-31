import React from "react";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useLocation } from "react-router";
import styles from './TrailerPage.module.css'


const TrailerPage = () => {

    const location = useLocation()

    console.log(location)

    return(
        <>
            <div
                className={`${styles.MovieBackground}`}>
                <VideoCard
                entity={location.state}
                language={"spanish"}
            />
            </div>
        </>
    )
    }


export default TrailerPage;