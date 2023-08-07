import React from 'react'
import Error from '../../assets/imagen/Error.jpg'

const ErrorPage = () => {
  return (
    <div style={{
        backgroundImage:`url(${Error})`,
        height: "760px",
        width:"auto",
        backgroundRepeat: "no-repeat",
        marginLeft:'16vh'
        }}>
            <h4 style={{
                color:"white",
                paddingTop:"40vh",
                paddingLeft:"24vh"
                }}>Ops! No se encueuentra la ruta</h4>
        </div>
  )
}

export default ErrorPage