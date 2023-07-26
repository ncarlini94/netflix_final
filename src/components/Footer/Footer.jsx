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
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            Preguntas frecuentes
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            Privacidad
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            Centro de ayuda
            </Link></li>
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/Account'}>
            Cuenta
            </Link></li>
            <li  className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            Avisos Legales
            </Link></li>
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            Términos de uso
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            Contáctanos
            </Link></li>
            </div>
            <div className={`${styles.copyright} col-12`}>
              <h4 style={{fontSize:'2.4vh'}}>Web creada por - Nicolás -</h4>
            </div>
        </ul>
        </div>
    </>
  )
}

export default Footer