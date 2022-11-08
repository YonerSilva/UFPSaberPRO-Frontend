import React, { useEffect } from "react";
import Routes from "./services/acceptRoutes";
import StoreProvider, { useDispatch } from "./store/Provider/storeProvider";

import * as service from './store/services/UsuarioService';


const App = () => {
     const dispatch = useDispatch();
     const getDatosGenerales = async () => {
          const response = await service.getDatosGenerales();
          if (response.error !== null || response.error !== undefined) {
               dispatch({
                    type: "LISTAR_DATOS_AUTH",
                    payload: response.general
               });
          }
     }

     useEffect(() => {
          getDatosGenerales();
     }, []);

     return (
          <Routes />
     );
}

const Constructor = () => {
     return (
          <StoreProvider>
               <App />
          </StoreProvider>
     )
}
export default Constructor;