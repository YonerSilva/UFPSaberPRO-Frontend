import React, { useEffect, useMemo, useReducer, useState } from "react";
import Routes from "./services/acceptRoutes";

import { DatosGReducer, useAppContext, AppContext } from './store/reducers/DatosGlobales';
import * as service from './store/services/DatoGeneralService';

const initialState = {
     lista_programas: [""],
     lista_roles: [""]
}

const App = ()=> {
     const { listarItem } = useAppContext();

     const getDatosGenerales = async () => {
          const response = await service.getDatosGenerales();
          if (response.error !== null || response.error !== undefined) {
               listarItem(response.general);
          }
     }

     useEffect(() => {
          getDatosGenerales();
     }, []);

     return (
          <Routes />
     );
}

const Constructor= ()=>{

     const [state, dispatch] = useReducer(DatosGReducer, initialState);

     const listarItem = (datos) => {
          dispatch({ type: 'LISTAR_ITEM', payload: datos })
     }

     const value = useMemo(()=>{
          return ({
               state,
               listarItem
          })
     },[]);

     return (
          <AppContext.Provider value={value}>
               <App/>
          </AppContext.Provider>
     )
}
export default Constructor;