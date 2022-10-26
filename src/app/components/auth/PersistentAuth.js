import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import * as service from '../../store/services/UsuarioService';
import { Outlet, Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


const PersistAuth = () => {

     const auth = useAuth();
     const [loading, setLoading] = useState(null);

     useEffect(() => {
          const persist = async () => {
               if(sessionStorage.length === 0){
                    auth.setAuth({
                         token: "",
                         usuario: "",
                    });
                    auth.setActive(true);
                    setLoading(true);
               }

               if (!auth.active) {
                    const usuario = await service.getUser();
                    const token = await service.getUserToken();
                    auth.setAuth({
                         token: token,
                         usuario: usuario,
                    });
                    auth.setActive(true);
                    setLoading(true);
               } else {
                    setLoading(false);
               }
          }
          persist();
     }, []);

     return (
          <>
               {auth.active
                    ? <Outlet />
                    : loading
                         ?
                              <Navigate to="/"/>
                         :    
                              <div className='d-flex justify-content-center'>
                                   <Spinner animation="border" variant='primary' size='' role="status" style={{ marginTop: '25%', marginBottom: '25%' }} />
                              </div>
               }
          </>
     )
}

export default PersistAuth;