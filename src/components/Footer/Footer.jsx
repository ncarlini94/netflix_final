import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"

const Footer = () => {


  return (
    <>
    <div className='container-fluid pt-5'>
        <ul className={`${styles.list} row pt-5 ps-5 pb-5`}>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Preguntas frecuentes
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Privacidad
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Centro de ayuda
            </Link></li>
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Cuenta
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Formas de ver
            </Link></li>
            <li  className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Solo en Netflix
            </Link></li>
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Términos de uso
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Contáctanos
            </Link></li>
            </div>
            <div className={`${styles.copyright} col-12`}>
              <h4>Nicolás</h4>
            </div>
        </ul>
        </div>
    </>
  )
}

export default Footer