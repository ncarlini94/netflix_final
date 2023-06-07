import React, { useEffect } from 'react'

const CreatePassword = ({formData, setFormData}) => {

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, email: localStorage.getItem('email') || '' }));
  },[setFormData])

  return (
    <>
    <div className='container pb-5' style={{width:'80vh'}}>
        <div className="form-group pb-3">
        <label style={{color:'rgb(255,255,255)'}}>Email</label>
        <input
            type='text'
            value={formData.email}
            className='form-control'
            placeholder='Email'
            onChange={(e) => {setFormData({...formData, email: e.target.value})}}
        />
      </div>
      <div className='form-group text-center'>
        <input
            type='password'
            value={formData.password}
            className='form-control'
            placeholder='Password'
            onChange={(e) => {setFormData({...formData, password: e.target.value})}}
        />
</div>
</div>
</>
  )
}

export default CreatePassword