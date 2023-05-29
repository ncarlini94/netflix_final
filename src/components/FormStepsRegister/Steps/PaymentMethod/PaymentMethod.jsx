import React from 'react'
import CreditCard from '../../../CreditCard/CreditCard'


const PaymentMethod = ({formData, setFormData}) => {


  return (
    <>
      <CreditCard formData={formData} setFormData={setFormData}/>
    </>
  )
}

export default PaymentMethod