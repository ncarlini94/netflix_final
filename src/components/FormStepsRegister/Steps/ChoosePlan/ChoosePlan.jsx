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
    <div className='container' style={{color:"white", marginBottom:'1vh'}}>
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

        <div className='row pb-3'>
          <h3 className='col-6'>{t("monthlyPrice")}</h3>
          <h3 className='col'>$ 999</h3>
          <h3 className='col'>$ 1.699</h3>
          <h3 className='col'>$ 2.399</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>{t("videoQuality")}</h3>
          <h3 className='col'>{t("good")}</h3>
          <h3 className='col'>{t("better")}</h3>
          <h3 className='col'>{t("optimal")}</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>{t("resolution")}</h3>
          <h3 className='col'>720p</h3>
          <h3 className='col'>1080p</h3>
          <h3 className='col'>4K+HDR</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>{t("watchNetflixOn")}</h3>
          <h3 className='col'>✓</h3>
          <h3 className='col'>✓</h3>
          <h3 className='col'>✓</h3>
        </div>
    </div>
    </>
  )
}

export default ChoosePlan