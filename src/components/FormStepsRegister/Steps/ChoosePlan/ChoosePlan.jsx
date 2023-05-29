import React,  { useState }  from 'react'

const ChoosePlan = ({formData, setFormData}) => {

  const [selectedPlan, setSelectedPlan] = useState('')

  const handlePlanChange = (plan) => {
    setFormData({...formData, plan})
    setSelectedPlan(plan)
  }


  return (
    <>
    <div className='container' style={{color:"white"}}>
    <div className='row'>
      <div
      className='col-4 p-5 bg-dark'
      onClick={()=>{handlePlanChange('basic')}}
      >
        Basic
      </div>

      <div
      className='col-4 p-5 bg-dark'
      onClick={()=>{handlePlanChange('standard')}}
      >
      Standard
      </div>

      <div
      className='col-4 p-5 bg-dark'
      onClick={()=>{handlePlanChange('premium')}}
      >
      Premium
      </div>
      </div>
    </div>
    </>
  )
}

export default ChoosePlan