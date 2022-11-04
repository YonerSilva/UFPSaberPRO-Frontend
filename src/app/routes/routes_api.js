import React from "react";

const API = {
     GENERAL: {
          DATOS_GENERALES: "auth/api/general/getDatos"
     },
     AUTH: {
          SIGN_UP: "auth/register",
          SIGN_IN: "auth/login",
          VALIDATE_TOKEN: "auth/validateToken",
     },
     CONVOCATORIA: {
          GENERAL: "api/convocatorias/general",
          GUARDAR: "api/convocatorias/guardarConvocatoria"
     },
     SIMULACRO: {
          GENERAL: "api/simulacros/general",
          GUARDAR: "api/simulacros/guardarSimulacro"
     }
}

export default API;