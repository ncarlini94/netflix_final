import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as NetflixLogo } from "../../assets/imagen/logo.svg";
import styles from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
import {auth} from '../../firebase/config';
import { ProfileContext } from "../../contexts/ProfileContext";

const Navbar = () => {

  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { selectedProfile } = useContext(ProfileContext);
  
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

  if(!selectedProfile){
    navigate('/Profiles')
  }
  }, [navigate, selectedProfile])


  const closeSession = () => {
    navigate("/");
    auth.signOut();
  }

    return(
        <>
        <div className={`nav row fixed-top ${isScrolled ? `${styles.navbar_dark}` : `${styles.navbar}`}`}>
            <Link className="navbar-brand col-sm-1 sm-5" to="/Home">
              <NetflixLogo className={`${styles.logo}`}/>
            </Link>

        <nav className={`${styles.navbar_center} col-sm-10 navbar navbar-expand-lg`}>
            <button className="navbar-toggler dropdown-toggle bg-dark" data-bs-toggle="dropdown" type="button" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={`${styles.explorer}`}>Explorar</span>
          </button>

            <div className={`${styles.dropmenu} dropdown-menu collapse navbar-collapse`} id="navbarToggleExternalContent">
            <ul className={`${styles.list} navbar-nav me-auto mb-2 mb-lg-0 ps-3 pe-3`}>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="/Home">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="Series">Series</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="Movies">Peliculas</Link>
            </li>
            <li className="nav-item">
            <Link className={`${styles.nav_link} nav-link`} to="Popular">Novedades Populares</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="MyList">Mi Lista</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`}>Explora por idiomas</Link>
            </li>
            </ul>
          </div>
      </nav>

      {selectedProfile && (
          <div className="col-sm-1 btn-group">
            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={`${selectedProfile.avatar}`} className={`${styles.avatar} navbar-toggler-icon`} alt="Avatar"></img>
            </button>
            <ul className="dropdown-menu dropdown-menu-end bg-dark me-1">
              <li><h5 style={{color: 'rgba(255,255,255,1)', fontSize: "4vh", paddingLeft:"2vh", paddingBottom: "0.6vh"}}>{selectedProfile.name}</h5></li>
              <li><Link className={`${styles.dropuser} dropdown-item`} to={'/Account'}>Cuenta</Link></li>
              <li><Link className={`${styles.dropuser} dropdown-item`} to={'/Profiles'}>Cambiar Perfil</Link></li>
              <li><Link className={`${styles.dropuser} dropdown-item`} to={'/ManageProfiles'}>Editar Perfiles</Link></li>
              <li><Link className={`${styles.dropuser} dropdown-item`}>Centro de Ayuda</Link></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><Link className={`${styles.dropuser} dropdown-item`} onClick={closeSession}>Cerrar Sessión</Link></li>
            </ul>
          </div>
      )}
      </div>
    </>
    )

}

export default Navbar;