import React from 'react'
import Card from 'react-credit-cards-2';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../../utils/cardValidation'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from "./CreditCard.module.css"
import { useTranslation} from 'react-i18next'
const CreditCard = ({formData, setFormData}) => {

  const { t } = useTranslation();
  const { number, expiry, cvc, name, focused, issuer } = formData;

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
        <div className={`${styles.paymentContainer}`}>
        <div key="Payment">
        <div className="App-payment">
        <Card
            number={number}
            expiry={expiry}
            cvc={cvc}
            name={name}
            focused={focused}
            callback={handleCallback}
            placeholders={{ name: 'NAME', number: 'Card Number', expiry: 'MM/YY', cvc: 'CVC' }}
          />
          <form>
          <input
                type='text'
                name='name'
                className={`${styles.inputForm} form-control`}
                placeholder={t('name')}
                pattern='[A-Za-z -]+'
                required={true}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyPress={(e) => {
                  const pattern = /[A-Za-z -]/;
                  const inputChar = String.fromCharCode(e.charCode);
                  if (!pattern.test(inputChar)) {
                      e.preventDefault();
                  }
                }}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='number'
                className={`${styles.inputForm} form-control`}
                placeholder={t('cardNumber')}
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required={true}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='expiry'
                className={`${styles.inputForm} form-control`}
                placeholder={t('MM/AA')}
                pattern='\d\d/\d\d'
                required={true}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
                  color:'rgb(255,255,255)'
              }}
              />
              <input
                type='tel'
                name='cvc'
                className={`${styles.inputForm} form-control`}
                placeholder={t('CVC')}
                pattern='\d{3}'
                required={true}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                style={{
                  backgroundColor:'rgb(60,60,60)',
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