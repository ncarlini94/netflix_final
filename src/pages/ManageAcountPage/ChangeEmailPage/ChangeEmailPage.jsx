import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../../firebase/config';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import styles from './ChangeEmailPage.module.css'

const ChangeEmailPage = () => {


const [user, setUser] = useState('')
const [password, setPassword] = useState('');
const [newEmail, setNewEmail] = useState('')
const [confirmEmail, setConfirmEmail] = useState('')
const [error, setError] = useState('')

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
}, []);


const handleSubmit = async (e) => {
    e.preventDefault();
    if (newEmail !== confirmEmail) {
        setError('Las Email no coinciden');
        return;
    }
    try {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        const userDocRef = doc(firestore, 'NetflixUsers', user.email);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail)
        await updateDoc(userDocRef, { email: newEmail });
        console.log('Email actualizada con éxito');
        setNewEmail('');
        setConfirmEmail('');
        setPassword('');
        setUser('')
    } catch (error) {
        setError('La contraseña no es correcta.')
    }
}

return (
    <>
    {user && (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title}`}>Cambio de Mail</h1>
                <form
                className='row'
                style={{width:'55vh', marginTop:'12vh'}}
                onSubmit={handleSubmit}
                >
                <input
                    className={`${styles.input} col-sm-12`}
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className={`${styles.input} col-sm-12`}
                    type="email"
                    placeholder="Nuevo Email"
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                />
                <input
                    className={`${styles.input} col-sm-12`}
                    type="email"
                    placeholder="Confirmar Email"
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                />
                <button className={`${styles.buttom} btn`} type="submit">Actualizar Email</button>
                <h4 className={`${styles.error}`}>{error}</h4>
                </form>
            </div>
    )}
        
    </>
);
};

export default ChangeEmailPage;
