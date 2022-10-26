import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";

const API_URL = Constantes.SISTEMA;

/*--------------------------------GENERAL------------------------------------*/

export const getDatosGenerales = async ()=>{
  return await (await fetch(API_URL + API.GENERAL.DATOS_GENERALES,{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
}

/*--------------------------------END------------------------------------*/