import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const { t } = useTranslation()

  return (
    <>
    <div className='container-fluid pt-5'>
        <ul className={`${styles.list} row pt-5 ps-5 pb-5`}>

            <div className='col-sm'>
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
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/Account'}>
            {t('account')}
            </Link></li>
            <li  className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('legalNotices')}
            </Link></li>
            </div>

            <div className='col-sm'>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`} to={'/HelpPage'}>
            {t('termsOfUse')}
            </Link></li>
            <li className={`${styles.item}`}>
            <Link className={`${styles.link}`}>
            {t('contactUs')}
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