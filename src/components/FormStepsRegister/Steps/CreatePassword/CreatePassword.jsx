import React, { useEffect } from 'react'
import styles from './CreatePassword.module.css'

const CreatePassword = ({formData, setFormData}) => {

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, email: localStorage.getItem('email') || '' }));
  },[setFormData])

  return (
    <>
    <div className='container pb-5' style={{width:'80vh'}}>
        <div className="form-group pb-3">
        {formData.email !== '' ?
        <h4 style={{
            backgroundColor:'rgb(35,35,35)',
            padding:'2vh',
            borderRadius:'0.3vh',
            borderColor:'rgba(94, 94, 94, 0.863)'
          }}>{formData.email}</h4>
        :
        <input
            className={`${styles.input} form-control`}
            style={{
              backgroundColor:'rgb(60,60,60)',
              padding:'2vh',
              borderRadius:'0.3vh'
              }}
            type='text'
            value={formData.email}
            placeholder='Email'
            onChange={(e) => {setFormData({...formData, email: e.target.value})}}
        /> }
      </div>
      <div className='form-group text-center'>
        <input
            className={`${styles.input} form-control`}
            style={{
              backgroundColor:'rgb(60,60,60)',
              padding:'2vh',
              borderRadius:'0.3vh',
              }}
            type='password'
            value={formData.password}
            placeholder='Password'
            onChange={(e) => {setFormData({...formData, password: e.target.value})}}
        />
</div>
</div>
</>
  )
}

export default CreatePassword