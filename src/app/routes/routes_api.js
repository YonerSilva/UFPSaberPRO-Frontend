import React from "react";

const API = {
     DATOGENERAL: {
          GENERAL: "api/general/getDatos",
     },
     AUTH: {
          SIGN_UP: "auth/register",
          SIGN_IN: "auth/login",
          VALIDATE_TOKEN: "auth/validateToken",
          GENERAL: "auth/getDatos"
     },
     CONVOCATORIA: {
          GENERAL: "api/convocatorias/general",
          GUARDAR: "api/convocatorias/guardarConvocatoria",
          ACTUALIZAR: "api/convocatorias/actualizarConvocatoria",
          ELIMINAR: "api/convocatorias/eliminarConvocatoria"
     },
     SIMULACRO: {
          GENERAL: "api/simulacros/general",
          GUARDAR: "api/simulacros/guardarSimulacro",
          ACTUALIZAR: "api/simulacros/actualizarSimulacro",
          PREGUNTAS: "api/simulacros/getPreguntas"
     },
     CATEGORIA: {
          GENERAL: "api/categorias/general",
          GUARDAR: "api/categorias/guardarCategoria",
          ACTUALIZAR: "api/categorias/actualizarCategoria"
     },
     SUBCATEGORIA: {
          GENERAL: "api/subcategorias/general",
          GUARDAR: "api/subcategorias/guardarSubcategoria",
          ACTUALIZAR: "api/subcategorias/actualizarSubcategoria"
     }, 
     PREGUNTAS: {
          GENERAL: "api/preguntas/general",
          GUARDAR: "api/preguntas/guardarPregunta",
          ACTUALIZAR: "api/preguntas/actualizarPregunta"
     }, 
     OPCION: {
          OPCIONES: "api/opciones/getOpciones",
          GUARDAR: "api/opciones/guardarOpcion",
          ACTUALIZAR: "api/opciones/actualizarOpcion"
     },

}

export default API;