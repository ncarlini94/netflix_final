import React,  { useEffect, useState }  from 'react'
import styles from "./ChangePlan.module.css"
import { auth, firestore } from '../../../firebase/config'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useNavigate } from 'react-router'

const ChoosePlan = () => {

    const navigate = useNavigate()
const [selectedPlan, setSelectedPlan] = useState('')
const [user, setUser] = useState('')

useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
          const getUser = async () => {
            try {
              const q = query(
                collection(firestore, "NetflixUsers"),
                where("id", "==", auth.currentUser.uid)
              );
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                setUser(doc.data())
                  });
            } catch (error) {
              console.error("Error retrieving users: ", error);
            }
          };
          getUser()
        } else {
          setUser(null);
        }
      });
}, [selectedPlan]);


const handlePlanChange = (plan) => {
    setSelectedPlan(plan)
}


const updatePlan = async () => {
    try {
      const userDocRef = doc(firestore, 'NetflixUsers', user.email);
      await updateDoc(userDocRef, { plan: selectedPlan });
      console.log('Plan actualizado exitosamente');
      navigate('/Home')
    } catch (error) {
      console.error('Error al actualizar el plan: ', error);
    }
  };


return (
    <>
    <div className='container' style={{color:"white", paddingTop:'15vh'}}>
    <div>
        <h2>Selecciona el plan ideal para ti</h2>
        <p>✓ Ve todo lo que quieras. Sin anuncios.</p>
        <p>✓ Recomendaciones exclusivas para ti.</p>
        <p>✓ Puedes cambiar de plan o cancelar cuando quieras.</p>
    </div>
    <div className={`${styles.boxPlan} d-flex flex-row-reverse`}>
        <div
        className={`${styles.btnPlan} col-sm-4`}
        onClick={()=>{handlePlanChange('Premium')}}
        >
        <h4>Premium</h4>
        </div>

        <div
        className={`${styles.btnPlan} col-sm-4`}
        onClick={()=>{handlePlanChange('Standar')}}
        >
        <h4>Standar</h4>
        </div>

        <div
        className={`${styles.btnPlan} col-sm-4`}
        onClick={()=>{handlePlanChange('Basic')}}
        >
        <h4>Basico</h4>
        </div>
        </div>

        <div className='row pb-3'>
            <h3 className='col-6'>Precio mensual (sin impuestos incluidos)</h3>
            <h3 className='col'>$ 999</h3>
            <h3 className='col'>$ 1.699</h3>
            <h3 className='col'>$ 2.399</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Calidad de video</h3>
            <h3 className='col'>Buena</h3>
            <h3 className='col'>Mejor</h3>
            <h3 className='col'>Óptima</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Resolución</h3>
            <h3 className='col'>720p</h3>
            <h3 className='col'>1080p</h3>
            <h3 className='col'>4K+HDR</h3>
        </div>
        <div className='row pb-3'>
        <h3 className='col-6'>Ve Netflix en tu TV, computadora, celular y tablet</h3>
            <h3 className='col'>✓</h3>
            <h3 className='col'>✓</h3>
            <h3 className='col'>✓</h3>
        </div>
        <div className='col-sm-12 d-flex justify-content-center'>
        <button  className={`${styles.buttom} btn`} onClick={updatePlan}>
          Aceptar
        </button>
        </div>
    </div>
    </>
)
}

export default ChoosePlan