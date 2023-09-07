import React from 'react'
import styles from './HelpPage.module.css'
import { ReactComponent as NetflixLogo } from "../../assets/imagen/logo.svg";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


const HelpPage = () => {

    const { t } = useTranslation()

return (
    <>
        <nav className={`${styles.navbar} navbar navbar-expand`}>
            <div className="container-fluid">
            <Link className={`${styles.Link}`} to="/">
                <NetflixLogo className={`${styles.logo}`} />
            </Link>
        </div>
    </nav>
    <div className={`${styles.boxText}`}>
        <span>{t('helpPagePartOne')}
        <br/>
        <br/>
        {t('helpPagePartTwo')}
        <br/>
        <br/>
        {t('helpPagePartThree')}
        <br/>
        <br/>
        {t('helpPagePartFour')}
        <br/>
        <br/>
        {t('helpPagePartFive')}
        <br/>
        <br/>
        {t('helpPagePartSix')}
        <br/>
        <br/>
        {t('helpPagePartSeven')}
        </span>
    </div>
    </>
)
}

export default HelpPage