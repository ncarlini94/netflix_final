import React from "react";
import { ReactComponent as NetflixLogo } from "../../assets/imagen/logo.svg";
import styles from "./LoginNavbar.module.css"
import { Link } from "react-router-dom";

const navBar = () => {

    return(
        <>
        <nav className="navbar navbar-expand-lg ps-5 px-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <NetflixLogo className={`${styles.logo}`}/>
                </Link>
            </div>
        </nav>
    </>
    )

}

export default navBar;