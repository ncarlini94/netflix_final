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
    <div>
      <h2>Selecciona el plan ideal para ti</h2>
      <p>✓ Ve todo lo que quieras. Sin anuncios.</p>
      <p>✓ Recomendaciones exclusivas para ti.</p>
      <p>✓ Puedes cambiar de plan o cancelar cuando quieras.</p>
    </div>
    <div className={`${styles.boxPlan} d-flex flex-row-reverse`}>
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

        <div className='row pb-3'>
          <h3 className='col-6'>Precio mensual (sin impuestos incluidos)</h3>
          <h3 className='col'>$ 999</h3>
          <h3 className='col'>$ 1.699</h3>
          <h3 className='col'>$ 2.399</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Calidad de video</h3>
          <h3 className='col'>Buena</h3>
          <h3 className='col'>Mejor</h3>
          <h3 className='col'>Óptima</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Resolución</h3>
          <h3 className='col'>720p</h3>
          <h3 className='col'>1080p</h3>
          <h3 className='col'>4K+HDR</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Ve Netflix en tu TV, computadora, celular y tablet</h3>
          <h3 className='col'>✓</h3>
          <h3 className='col'>✓</h3>
          <h3 className='col'>✓</h3>
        </div>
    </div>
    </>
  )
}

export default ChoosePlan