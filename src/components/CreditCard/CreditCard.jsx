import React from 'react'
import Card from 'react-credit-cards-2';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../../utils/cardValidation'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from "./CreditCard.module.css"

const CreditCard = ({formData, setFormData}) => {

  const { number, expiry, cvc, name, focused, issuer } = formData

  const handleCallback = ({issuer}, isValid) => {
    if(isValid) {
      setFormData({...formData, issuer})
    }
  }

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleInputFocus = ({ target }) => {
    setFormData({ ...formData, focus: target.name })
  }



    return (
        <>
        <div key="Payment">
        <div className="App-payment">
        <Card
            number={number}
            expiry={expiry}
            cvc={cvc}
            name={name}
            focused={focused}
            callback={handleCallback}
          />
          <div className={`${styles.paymentContainer}`}>
          <form>
          <input
                type='text'
                name='name'
                className={`${styles.inputForm} form-control`}
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  padding:'2vh',
                  borderRadius:'0.3vh',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='number'
                className={`${styles.inputForm} form-control`}
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  padding:'2vh',
                  borderRadius:'0.3vh',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='expiry'
                className={`${styles.inputForm} form-control`}
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  padding:'2vh',
                  borderRadius:'0.3vh',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='cvc'
                className={`${styles.inputForm} form-control`}
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  padding:'2vh',
                  borderRadius:'0.3vh',
                  color:'rgb(255,255,255)'
              }}
              />
            <input type='hidden' name='issuer' value={issuer}/>
          </form>
          </div>
          </div>
          </div>
        </>
      )
    }
    export default CreditCard;