import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './EmailForm.module.css'

const EmailForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const handleEmail = (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            return;
        }
        localStorage.setItem('email', email);
        navigate("/signup");
    }



return (
    <>
        <div className={`${styles.formBox}`}>
            <div className={`${styles.text}`}>
                <h1 className={`${styles.textTitle}`}>Películas y series ilimitadas y mucho más</h1>
                <h3 className={`${styles.textBody}`}>Disfruta donde quieras. Cancela cuando quieras.</h3>
                <h4 className={`${styles.textFooter}`}>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</h4>
            </div>
            <form
            className={`${styles.form} row`}
            onSubmit={handleEmail}
            >
                <input
                    className='form-control col-sm'
                    style={{
                    backgroundColor:'rgba(0, 0, 0, 0.5)',
                    color:'white'}}
                    placeholder='Email'
                    type="email"
                    name="emailregister"
                    id="emailregister"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button className='btn'>Comenzar</button>
            </form>
        </div>
    </>
)
}

export default EmailForm