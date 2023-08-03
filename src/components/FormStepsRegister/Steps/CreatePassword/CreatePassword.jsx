import React, { useEffect } from 'react'
import styles from './CreatePassword.module.css'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

const CreatePassword = ({formData, setFormData}) => {

  const { t } = useTranslation()
  const location = useLocation()

  const handleChange= (e) => {
    const { name , value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, email: location.state || '' }));
  },[setFormData, location])

  const isPasswordValid = (password) => {
    return password.length >= 6 && password.length <= 20;
  };

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
            type='email'
            name='email'
            value={formData.email}
            placeholder='Email'
            required
            onChange={handleChange}
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
            name='password'
            minLength={6}
            maxLength={20}
            value={formData.password}
            placeholder='Password'
            required
            onChange={handleChange}
        />
        {!isPasswordValid(formData.password) && (
            <p style={{ color: 'red' }}>
              {t("errorPassword")}
            </p>
          )}
</div>
</div>
</>
  )
}

export default CreatePassword