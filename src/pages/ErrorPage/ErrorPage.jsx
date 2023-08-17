import React from 'react'
import Error from '../../assets/imagen/Error.jpg'
import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div
    className={`${styles.container} container-fluid`}
    style={{
        backgroundImage:`url(${Error})`,
        }}>
            <h4 className={`${styles.msjError}`}>Ops! No se encueuentra la ruta</h4>
            <Link to={'/Home'}><button className={`${styles.buttom} btn`}>Inicio</button></Link>
        </div>
  )
}

export default ErrorPage