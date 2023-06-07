import React from "react";
import { ReactComponent as NetflixLogo } from "../../assets/imagen/logo.svg";
import styles from "./LoginNavbar.module.css"
import { Link } from "react-router-dom";

const navBar = () => {

    return(
        <>
        <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <NetflixLogo className={`${styles.logo}`}/>
                </Link>
                <div>
                    <button className={`${styles.sesionBtn} btn`}>
                    <Link style={{color:'rgb(255,255,255)', fontSize:'2.8vh', textDecoration:'none'}} to="/SignIn">Iniciar Sesion</Link>
                    </button>
                </div>
            </div>
        </nav>
    </>
    )

}

export default navBar;