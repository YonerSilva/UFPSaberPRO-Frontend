import React from "react";
import { Spinner } from 'react-bootstrap';

const Cargador = () => {
     return (
          <div className='d-flex justify-content-center'>
               <Spinner animation="border" variant='danger' size='' role="status" style={{ marginTop: '25%', marginBottom: '25%' }} />
          </div>
     )
}

export default Cargador;