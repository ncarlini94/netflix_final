import React, { useEffect, useState } from "react";
import { ReactComponent as NetflixLogo } from "../../assets/imagen/logo.svg";
import styles from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
import {auth, firestore} from '../../firebase/config';
import { collection, getDocs, query, where } from "firebase/firestore";

const Navbar = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getUser = async () => {
          try {
            const q = query(
              collection(firestore, "NetflixUsers"),
              where("id", "==", auth.currentUser.uid) // Filtrar por el uid del usuario actual
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser(doc.data())
              setAvatar(doc.data().avatar)
                });
          } catch (error) {
            console.error("Error retrieving users: ", error);
          }
        };
        getUser()
      } else {
        setUser(null);
      }
    });
  }, [avatar])


  const closeSession = () => {
    navigate("/");
    auth.signOut();
  }

    return(
        <>
        <div className={`nav row fixed-top`}>
            <Link className="navbar-brand col-auto mx-5" to="/">
              <NetflixLogo className={`${styles.logo}`}/>
            </Link>

        <nav className={`${styles.navbar} col navbar navbar-expand-lg`}>
            <button className="navbar-toggler dropdown-toggle bg-dark" data-bs-toggle="dropdown" type="button" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`${styles.explorer}`}>Explorar</span>
          </button>

            <div className={`${styles.dropmenu} dropdown-menu collapse navbar-collapse`} id="navbarToggleExternalContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ps-3 pe-3">
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="SeriesPage">Series</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="MoviesPage">Peliculas</Link>
            </li>
            <li className="nav-item">
            <Link className={`${styles.nav_link} nav-link`} to="PopularPage">Novedades Populares</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`}>Mi Lista</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`}>Explora por idiomas</Link>
            </li>
            </ul>
          </div>
      </nav>

      {avatar && (
          <div className="col-auto end-0 btn-group pe-4">
            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={`${user.avatar}`} className="navbar-toggler-icon" width="40" height="40" ></img>
            </button>
            <ul className="dropdown-menu dropdown-menu-end bg-dark">
              <li><h5 style={{color: '#d3d3d380', fontSize: "20px", paddingLeft:"0.6em", paddingBottom: "0.2em"}}>{user.name}</h5></li>
              <li><Link className={`${styles.dropuser} dropdown-item`}>Cuenta</Link></li>
              <li><Link className={`${styles.dropuser} dropdown-item`}>Centro de Ayuda</Link></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><Link className={`${styles.dropuser} dropdown-item`} onClick={closeSession}>Cerrar Session</Link></li>
            </ul>
          </div>
      )}
      </div>
    </>
    )

}

export default Navbar;