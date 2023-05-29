import React, { useEffect } from 'react'

const CreatePassword = ({formData, setFormData}) => {

  useEffect(() => {
    setFormData({ ...formData, email: localStorage.getItem('email') || '' });
  },[])

  return (
    <>
    <div className='container pt-5 pb-5'>
        <div className="form-group col-md-4 offset-md-4 text-center pb-3">
        <input
            type='text'
            value={formData.email}
            className='form-control'
            placeholder='Email'
            onChange={(e) => {setFormData({...formData, email: e.target.value})}}
        />
      </div>
      <div className='form-group col-md-4 offset-md-4 text-center'>
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