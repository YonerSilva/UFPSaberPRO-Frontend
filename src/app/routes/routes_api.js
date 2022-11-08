import React from "react";

const API = {
     GENERAL: {
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
          GUARDAR: "api/convocatorias/guardarConvocatoria"
     },
     SIMULACRO: {
          GENERAL: "api/simulacros/general",
          GUARDAR: "api/simulacros/guardarSimulacro"
     },
     CATEGORIA: {
          GENERAL: "api/categorias/general",
          GUARDAR: "api/categorias/guardarCategoria"
     },
}

export default API;