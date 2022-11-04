import { createContext, useContext, useMemo, useState } from "react";
import { ACCION } from "../actions/Acciones";

export const AppContext = createContext();

export const DatosGReducer = (state, action) => {
     const { payload, type } = action;

     switch (type) {
          case ACCION.LISTAR_ITEM:
               console.log(action);
               var data = [];
               state.lista_programas = payload.programas;
               state.lista_roles = payload.roles;
               return {
                    ...state,
                    data: data,
               }
          case ACCION.SET_LISTA_CONVOCATORIAS_PROGRAMA:
               console.log(action);
               return {
                    ...state,
                    lista_convocatorias_programa: payload.convocatorias_programa,
               }
          case ACCION.SET_LISTA_SIMULACROS_PROGRAMA:
               console.log(action);
               return {
                    ...state,
                    lista_simulacros_programa: payload.simulacros_programa,
               }
          default:
               return state;
     }
}

export const useAppContext = () => {
     const context = useContext(AppContext);
     if (!context) {
          throw new Error("No hay contexto.");
     }
     return context;
}