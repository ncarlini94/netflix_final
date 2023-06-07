import React,  { useEffect, useState }  from 'react'
import styles from "./ChoosePlan.module.css"

const ChoosePlan = ({formData, setFormData}) => {

  const [selectedPlan, setSelectedPlan] = useState('')

  const handlePlanChange = (plan) => {
    setFormData({...formData, plan})
    setSelectedPlan(plan)
  }

  useEffect(() => {
  }, [selectedPlan]);


  return (
    <>
    <div className='container' style={{color:"white"}}>
    <div className='row'>
      <div
      className={`${styles.btnPlan} col-sm-4`}
      onClick={()=>{handlePlanChange('basic')}}
      >
      <h4>Basic</h4>
      </div>

      <div
      className={`${styles.btnPlan} col-sm-4`}
      onClick={()=>{handlePlanChange('standar')}}
      >
      <h4>standar</h4>
      </div>

      <div
      className={`${styles.btnPlan} col-sm-4`}
      onClick={()=>{handlePlanChange('premium')}}
      >
      <h4>Premium</h4>
      </div>
      </div>
    </div>
    </>
  )
}

export default ChoosePlan