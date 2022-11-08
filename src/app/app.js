import React, { useEffect, useState } from "react";
import Cargador from "./components/extra/CargadorEventos";
import Routes from "./services/acceptRoutes";
import StoreProvider, { useDispatch, useStore } from "./store/Provider/storeProvider";

import * as service from './store/services/UsuarioService';


const App = () => {
     const {lista_programas, lista_roles} = useStore();
     const dispatch = useDispatch();
     const [loading, setLoading] = useState(true);

     const getDatosGenerales = async () => {
          const response = await service.getDatosGenerales();
          if (response.error !== null || response.error !== undefined) {
               dispatch({
                    type: "LISTAR_DATOS_AUTH",
                    payload: response.general
               });
          }
          setLoading(false);
     }

     useEffect(() => {
          if(lista_programas.length===0 || lista_roles.length===0){
               getDatosGenerales();
          }else{
               setLoading(false);
          }
     }, []);

     return (
          <>
               {
                    (() => {
                         if (!loading) {
                              return <Routes />
                         } else {
                              return <Cargador />
                         }
                    })()
               }
          </>
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