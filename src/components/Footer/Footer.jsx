import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const { t } = useTranslation()

  return (
    <>
    <div className='container-fluid'>
        <ul className={`${styles.list} row`}>

            <ul className={`${styles.box} col-sm-4`}>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('FAQ')}
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('privacy')}
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('helpCenter')}
            </Link></li>
            </ul>

            <ul className={`${styles.box} col-sm-4`}>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/Account'}>
            {t('account')}
            </Link></li>
            <li  className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('legalNotices')}
            </Link></li>
            </ul>

            <ul className={`${styles.box} col-sm-4`}>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('termsOfUse')}
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            {t('contactUs')}
            </Link></li>
            </ul>
            <div className={`${styles.copyright} col-sm-12`}>
              <h3 style={{fontSize:'2.4vh'}}>Web creada por - Nicolás -</h3>
            </div>
        </ul>
        </div>
    </>
  )
}

export default Footer