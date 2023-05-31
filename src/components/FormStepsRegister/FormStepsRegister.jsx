import React, { useState } from 'react'
import CreatePassword from './Steps/CreatePassword/CreatePassword'
import ChoosePlan from './Steps/ChoosePlan/ChoosePlan'
import PaymentMethod from './Steps/PaymentMethod/PaymentMethod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Avatar from '../../assets/imagen/avatar.png'

const FormStepsRegister = () => {

    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        name: '',
        plan: '',
        number: '',
        expiry: '',
        cvc: '',
        focus: '',
        issuer: '',
    });
    const FormTitles = [ "createPassword" , "selectPlan" , "paymentMethod"];

    const handleSubmit = async () => {
        try {
            const userRegister = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            console.log(userRegister)
            const docRef = doc(firestore, `NetflixUsers/${userRegister.user.email}`);
            const userQuery = await getDoc(docRef);
            if (!userQuery.exists()) {
              await setDoc(docRef, {
                    avatar: await Avatar,
                    id: userRegister.user.uid,
                    email: formData.email,
                    name: formData.name,
                    plan: formData.plan,
                    number: formData.number,
                    expiry: formData.expiry,
                    cvc: formData.cvc,
                    issuer: formData.issuer,
                })}
            }
            catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    console.log(formData)

    const PageDispley = () => {
        switch (page) {
            case 0:
                return <CreatePassword formData={formData} setFormData={setFormData}/>
            case 1:
                return <ChoosePlan formData={formData} setFormData={setFormData}/>
            case 2:
                return <PaymentMethod formData={formData} setFormData={setFormData}/>
            default:

        }
    }




  return (
    <>
        <div className='container bg-dark'>
            <div>
                {PageDispley()}
            </div>
            <div>
                <button className='btn btn-primary' style={{marginLeft: "20em"}}
                onClick={() =>{page === FormTitles.length -1 ? handleSubmit() : setPage((currPage) => currPage +1)}}
                >
                    Next
                </button>
            </div>
        </div>
    </>
  )
}

export default FormStepsRegister