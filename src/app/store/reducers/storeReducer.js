import { ACCION } from "../actions/Acciones";

const initialState = {
     formEdition: {},
     formEditionSimu: {},
     formEditionOpc: {},
     formEditionPreg: {},
     lista_programas: [],
     lista_roles: [],
     lista_convocatorias_programa: [],
     lista_simulacros_programa: [],
     lista_categorias_programa: [],
     lista_subcategorias_programa: [],
     lista_usuarios_programa: [],
     lista_preguntas_programa: [],

     lista_convocatoria_usuario: [],
     lista_convocatoria_activa: [],
}

export const storeReducer = (state, action) => {
     const { type, payload } = action;

     switch (type) {
          case ACCION.SET_FORM_EDITION:
               console.log(action);
               return {
                    ...state,
                    formEdition: payload
               };
          case ACCION.SET_FORM_EDITION_OPC:
               console.log(action);
               return {
                    ...state,
                    formEditionOpc: payload
               };
          case ACCION.SET_FORM_EDITION_SIMU:
               console.log(action);
               return {
                    ...state,
                    formEditionSimu: payload
               };
          case ACCION.SET_FORM_EDITION_PREG:
               console.log(action);
               return {
                    ...state,
                    formEditionPreg: payload
               };
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
               state.lista_usuarios_programa = payload.usuarios_programa;
               state.lista_preguntas_programa = payload.preguntas_programa;
               return state;
          case ACCION.SET_LISTA_CONVOCATORIAS_PRG:
               console.log(action);
               return {
                    ...state,
                    lista_convocatorias_programa: payload.convocatorias_programa
               };
          case ACCION.SET_LISTA_SIMULACROS_PRG:
               console.log(action);
               return {
                    ...state,
                    lista_simulacros_programa: payload.simulacros_programa
               };
          case ACCION.SET_LISTA_CATEGORIA_PRG:
               console.log(action);
               return {
                    ...state,
                    lista_categorias_programa: payload.categorias_programa
               };
          case ACCION.SET_LISTA_SUBCATEGORIA_PRG:
               console.log(action);
               return {
                    ...state,
                    lista_subcategorias_programa: payload.subcategorias_programa
               };
          case ACCION.SET_LISTA_PREGUNTAS_PRG:
               console.log(action);
               return {
                    ...state,
                    lista_preguntas_programa: payload.preguntas_programa
               };
          case ACCION.SET_LISTA_CONVOCATORIA_USUARIO:
               console.log(action);
               return{
                    ...state,
                    lista_convocatoria_usuario: payload.convocatoria_usuario
               };
          case ACCION.SET_LISTA_CONOVOCATORIA_ACTIVA:
               console.log(action);
               return{
                    ...state,
                    lista_convocatoria_activa: payload.convocatoria_activa
               };
          default:
               return state;
     }
}

export { initialState };
export default storeReducer;