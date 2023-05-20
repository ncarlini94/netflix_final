import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"

const Footer = () => {


  return (
    <>
    <div className='pt-5'>
        <ul className={`${styles.list} row ms-5 mb-5`}>

            <div className='col-sm'>
            <li><Link className={`${styles.Link}`}>
            Preguntas frecuentes
            </Link></li>
            <li><Link className={`${styles.Link}`}>
            Privacidad
            </Link></li>
            <li><Link className={`${styles.Link}`}>
            Centro de ayuda
            </Link></li>
            </div>

            <div className='col-sm'>
            <li><Link className={`${styles.Link}`}>
            Cuenta
            </Link></li>
            <li><Link className={`${styles.Link}`}>
            Formas de ver
            </Link></li>
            <li><Link className={`${styles.Link}`}>
            Solo en Netflix
            </Link></li>
            </div>

            <div className='col-sm'>
            <li><Link className={`${styles.Link}`}>
            Términos de uso
            </Link></li>
            <li><Link className={`${styles.Link}`}>
            Contáctanos
            </Link></li>
            </div>
            <div className='col-12'>
              <h4>Copyright</h4>
            </div>
        </ul>
        </div>
    </>
  )
}

export default Footer