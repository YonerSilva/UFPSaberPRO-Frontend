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
}

export default API;