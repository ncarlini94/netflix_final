import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase/config';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const ChangePasswordPage = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword)
      console.log('Contraseña actualizada con éxito');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log('Hubo un error al actualizar la contraseña. Inténtalo de nuevo.');
      setError(error.message)
    }
  }

  console.log(error)

  return (
    <>
      <div className="container-fluid ps-5 pt-5">
            <h1>Cambio de contraseña</h1>
            <div className="">
              <form
              className='row'
              style={{width:'40vh'}}
              onSubmit={handleSubmit}
              >
                <input
                  className='col-sm-12'
                  type="password"
                  placeholder="Contraseña actual"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  className='col-sm-12'
                  type="password"
                  placeholder="Nueva contraseña"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  className='col-sm-12'
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button className='btn btn-primary' type="submit">Actualizar contraseña</button>
              </form>
            </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
