import React from 'react'
import styles from './HelpPage.module.css'
import { useTranslation } from 'react-i18next'


const HelpPage = () => {

    const { t } = useTranslation()

return (
    <>
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