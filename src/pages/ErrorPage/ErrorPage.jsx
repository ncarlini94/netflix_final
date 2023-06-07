import React from 'react'
import Error from '../../assets/imagen/Error.jpg'

const ErrorPage = () => {
  return (
    <div style={{backgroundImage:`url(${Error})`, height: "110vh", width:"auto", backgroundRepeat: "no-repeat", marginTop:"-3em"}}>
            <h4 style={{color:"white", paddingTop:"40vh", paddingLeft:"24vh"}}>Ops! No se encueuentra la ruta</h4>
        </div>
  )
}

export default ErrorPage