import React from 'react'
import styles from './ErrorPage.module.css'
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=''>
        <h4 className={`${styles.MsjError}`}>Oops. Error</h4>
        <Link to={"/"}>Regresar</Link>
    </div>
  )
}

export default ErrorPage