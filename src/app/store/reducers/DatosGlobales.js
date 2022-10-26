import { createContext, useContext, useMemo, useState } from "react";
import { ACCION } from "../actions/Acciones";

export const AppContext = createContext();

export const DatosGReducer = (state, action) => {
     const { payload, type } = action;

     switch (type) {
          case ACCION.LISTAR_ITEM:
               var data = [];
               state.lista_programas = payload.programas;
               state.lista_roles = payload.roles;

               return {
                    ...state,
                    data: data,
               }
          case ACCION.SET_LISTA_PROGRAMAS:
               return {
                    ...state,
                    lista_programas: payload,
               }
          case ACCION.SET_LISTA_ROLES:
               return {
                    ...state,
                    lista_roles: payload,
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