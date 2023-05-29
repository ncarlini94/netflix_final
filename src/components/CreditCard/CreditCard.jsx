import React from 'react'
import Card from 'react-credit-cards-2';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../../utils/cardValidation'

import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard = ({formData, setFormData}) => {

  const { number, expiry, cvc, name, focused } = formData

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
          />
          <form>
          <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                type='tel'
                name='cvc'
                className='form-control'
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            <input type='hidden'/>
          </form>
          </div>
          </div>
        </>
      )
    }
    export default CreditCard;