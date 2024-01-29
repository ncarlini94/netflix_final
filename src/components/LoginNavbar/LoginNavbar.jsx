import React from "react";
import NetflixLogo  from "../../assets/imagen/logo2.jpg";
import styles from "./LoginNavbar.module.css"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginNavbar = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
  }

    return(
        <>
        <nav className={`${styles.navbar} navbar navbar-expand`}>
      <div className="container-fluid">
        <Link className="" to="/">
          <img src={NetflixLogo} alt="logo" className={`${styles.logo}`}/>
        </Link>
        <div className={`${styles.box} row`}>
          <div className="col-auto" style={{width:'auto'}}>
            <select
              className={`${styles.selectedForm} form-select`}
              value={i18n.language}
              onChange={changeLanguage}
              style={{ maxWidth: "22vh" }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className={`col-auto`}>
            <button className={`${styles.sesionBtn} btn`}>
              <Link
                style={{ color: "rgb(255,255,255,0.9)", textDecoration: "none" }}
                to="/SignIn"
              >
                {t("SignIn")}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
    </>
    )

}

export default LoginNavbar;