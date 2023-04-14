import React from "react";
import Logo from "../../assets/imagen/logo.png"
import "./Navbar.css"
import Avatar from "../../assets/imagen/avatar.png"
import { Link } from "react-router-dom";

const navBar = () => {

    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary ps-5 px-5">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={Logo} width="50" height="50"></img>
            </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><img src={Avatar} width="40" height="40"></img></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ps-2">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="SeriesPage">Series</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="MoviesPage">Peliculas</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="PopularPage">Novedades Populares</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Mi Lista</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Explora por idiomas</Link>
            </li>
            </ul>

            <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>
    </>
    )

}

export default navBar;