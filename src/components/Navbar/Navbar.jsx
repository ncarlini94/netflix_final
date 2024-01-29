import React, { useEffect, useState } from "react";
import NetflixLogo from "../../assets/imagen/logo.jpg";
import styles from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
import {auth} from '../../firebase/config';
import { useTranslation } from 'react-i18next'

const Navbar = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const storedProfile = JSON.parse(localStorage.getItem('profile'));
  const [profile] = useState(storedProfile);


  const clearLocalStorage = () => {
    localStorage.removeItem('profile');
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  if(!profile){
    navigate('/Profiles')
  }
  }, [navigate, profile])



  const closeSession = () => {
    navigate("/");
    auth.signOut();
    clearLocalStorage();
  }



    return(
        <>
        <div
        className={`nav row fixed-top ${isScrolled ? `${styles.navbar_dark}` : `${styles.navbar}`}`}>
            <Link className="navbar-brand col-2 " to="/Home">
              <img src={NetflixLogo} alt="logo" className={`${styles.logo}`}/>
            </Link>
        <nav className={`${styles.navbar_center} col-9 navbar navbar-expand-sm`}>
            <button
            className="navbar-toggler dropdown-toggle bg-dark"
            data-bs-toggle="dropdown"
            type="button"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span
            className={`${styles.explorer} pe-2`}>
            {t("explore")}
            </span>
          </button>

            <div
            className={`${styles.dropmenu} dropdown-menu collapse navbar-collapse`}
            id="navbarToggleExternalContent">
            <ul
            className={`${styles.list} navbar-nav me-auto mb-2 mb-lg-0 ps-3 pe-3`}>
            <li
            className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="/Home">{t("home")}</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="Series">{t("series")}</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="Movies">{t("movies")}</Link>
            </li>
            <li className="nav-item">
            <Link className={`${styles.nav_link} nav-link`} to="Popular">{t("popularNews")}</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="MyList">{t("myList")}</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.nav_link} nav-link`} to="SearchPage">{t("Search")}</Link>
            </li>
            </ul>
          </div>
      </nav>

      {profile && (
          <div
            className={`${styles.boxAvatar} col-1 btn-group`}>
            <button
              type="button"
              className="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
                <img
                  src={`${profile.avatar}`}
                  className={`${styles.avatar} navbar-toggler-icon`}
                  alt="Avatar">
                </img>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end bg-dark me-1">
                <li>
                  <h5
                    style={{
                      color: 'rgba(255,255,255,1)',
                      fontSize: "4vh",
                      paddingLeft:"2vh",
                      paddingBottom: "0.6vh"
                    }}>
                    {profile.name}
                  </h5>
                </li>
                <li>
                  <Link
                    className={`${styles.dropuser} dropdown-item`}
                    to={'/Account'}>
                    {t("account")}
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.dropuser} dropdown-item`}
                    to={'/Profiles'}>
                    {t("changeProfile")}
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.dropuser} dropdown-item`}
                    to={'/ManageProfiles'}>
                    {t("editProfiles")}
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.dropuser} dropdown-item`}
                    to={'/HelpPage'}>
                    {t("helpCenter")}
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr></li>
                <li>
                  <Link
                    className={`${styles.dropuser} dropdown-item`}
                    onClick={closeSession}>
                    {t("signOff")}
                  </Link>
                </li>
            </ul>
          </div>
      )}
      </div>
    </>
    )

}

export default Navbar;