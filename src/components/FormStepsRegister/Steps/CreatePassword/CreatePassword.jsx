import React, { useEffect } from 'react'
import styles from './CreatePassword.module.css'
import { useLocation } from 'react-router'

const CreatePassword = ({formData, setFormData}) => {

  const location = useLocation()


  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, email: location.state || '' }));
  },[setFormData, location])

  return (
    <>
    <div className='container-fluid pb-5'
    style={{width:'80vh'}}>
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
            required
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
            required
            onChange={(e) => {setFormData({...formData, password: e.target.value})}}
        />
</div>
</div>
</>
  )
}

export default CreatePassword