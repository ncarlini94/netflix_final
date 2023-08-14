import React,  { useEffect, useState }  from 'react'
import styles from "./ChoosePlan.module.css"
import {useTranslation} from 'react-i18next'

const ChoosePlan = ({formData, setFormData}) => {

  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState('')
  const [clickedButton, setClickedButton] = useState('');

  const handlePlanChange = (plan) => {
    setFormData({...formData, plan})
    setSelectedPlan(plan)
    setClickedButton(plan)
  }

  useEffect(() => {
  }, [selectedPlan]);


  return (
    <>
    <div className={`${styles.box} container-fluid`} style={{color:"white"}}>
    <div>
      <h2 style={{marginBottom:'2.5vh'}}>{t("titlePlanRegister")}</h2>
      <p>✓ {t("firstTextPlanRegister")}</p>
      <p>✓ {t("secondTextPlanRegister")}</p>
      <p>✓ {t("thirdTextPlanRegister")}</p>
    </div>
    <div className={`${styles.boxPlan} d-flex flex-row-reverse`}>
      <div
      className={`${styles.btnPlan} col-sm-4 ${clickedButton === 'Premium' && styles.buttonClicked}`}
      onClick={()=>{handlePlanChange('Premium')}}
      >
      <h4>{t("premium")}</h4>
      </div>

      <div
      className={`${styles.btnPlan} col-sm-4 ${clickedButton === 'Standar' && styles.buttonClicked}`}
      onClick={()=>{handlePlanChange('Standar')}}
      >
      <h4>{t("standard")}</h4>
      </div>

      <div
      className={`${styles.btnPlan} col-sm-4 ${clickedButton === 'Basic' && styles.buttonClicked}`}
      onClick={()=>{handlePlanChange('Basic')}}
      >
      <h4>{t("basic")}</h4>
      </div>
      </div>

        <div className={`${styles.rowBox} row pb-3}`}>
        <h2 className={`${styles.textLegend} col-sm-6`}>{t("monthlyPrice")}</h2>
          <h3 className='col-sm'>$ 999</h3>
          <h3 className='col-sm'>$ 1.699</h3>
          <h3 className='col-sm'>$ 2.399</h3>
        </div>
        <div className={`${styles.rowBox} row pb-3}`}>
          <h2 className={`${styles.textLegend} col-sm-6`}>{t("videoQuality")}</h2>
            <h3 className='col-sm'>{t("good")}</h3>
            <h3 className='col-sm'>{t("better")}</h3>
            <h3 className='col-sm'>{t("optimal")}</h3>
        </div>
        <div className={`${styles.rowBox} row pb-3}`}>
        <h2 className={`${styles.textLegend} col-sm-6`}>{t("resolution")}</h2>
            <h3 className='col-sm'>720p</h3>
            <h3 className='col-sm'>1080p</h3>
            <h3 className='col-sm'>4K+HDR</h3>
        </div>
        <div className={`${styles.rowBox} row pb-3}`}>
        <h2 className={`${styles.textLegend} col-sm-6`}>{t("watchNetflixOn")}</h2>
            <h3 className='col-sm'>✓</h3>
            <h3 className='col-sm'>✓</h3>
            <h3 className='col-sm'>✓</h3>
        </div>
    </div>
    </>
  )
}

export default ChoosePlan