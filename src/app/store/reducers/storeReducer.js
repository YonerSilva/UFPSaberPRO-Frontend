import { ACCION } from "../actions/Acciones";

const initialState = {
     lista_programas: [],
     lista_roles: [],
     lista_convocatorias_programa: [],
     lista_simulacros_programa: [],
     lista_categorias_programa: [],
     lista_subcategorias_programa: []
}

export const storeReducer = (state, action) => {
     const {type, payload} = action;

     switch (type) {  
          case ACCION.LISTAR_DATOS_AUTH:
               console.log(action);
               state.lista_programas = payload.programas;
               state.lista_roles = payload.roles;
               return state;
          case ACCION.LISTAR_DATOS_GENERAL:
               console.log(action);
               state.lista_convocatorias_programa = payload.convocatorias_programa;
               state.lista_simulacros_programa = payload.simulacros_programa;
               state.lista_categorias_programa = payload.categorias_programa;
               state.lista_subcategorias_programa = payload.subcategorias_programa;
               return state;
          default:
               return state;
     }
}

export {initialState};
export default storeReducer;