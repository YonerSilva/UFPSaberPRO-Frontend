import React, { useEffect, useMemo, useReducer, useState } from "react";
import Routes from "./services/acceptRoutes";

import { DatosGReducer, useAppContext, AppContext } from './store/reducers/DatosGlobales';
import * as service from './store/services/DatoGeneralService';

const initialState = {
     lista_programas: [""],
     lista_roles: [""],
     lista_convocatorias_programa: [""],
     lista_simulacros_programa: [""]
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

     const setConvocatoriasPrg = (datos) => {
          dispatch({ type: 'SET_LISTA_CONVOCATORIAS_PROGRAMA', payload: datos })
     }

     const setSimulacrosPrg = (datos) => {
          dispatch({ type: 'SET_LISTA_SIMULACROS_PROGRAMA', payload: datos })
     }

     const value = useMemo(()=>{
          return ({
               state,
               listarItem,
               setConvocatoriasPrg,
               setSimulacrosPrg
          })
     },[]);

     return (
          <AppContext.Provider value={value}>
               <App/>
          </AppContext.Provider>
     )
}
export default Constructor;