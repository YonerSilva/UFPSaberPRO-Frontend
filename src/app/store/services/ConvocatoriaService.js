import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import {getUserToken, getUser} from './UsuarioService';
const API_URL = Constantes.SISTEMA;


/*--------------------------------GENERAL------------------------------------*/

export const getDatosGenerales = async ()=>{
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.CONVOCATORIA.GENERAL + "/?id_usuario="+usuario.id_usuario+"&prg_codigo="+usuario.programa.prg_codigo,{
    method: "GET",
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json',
    },
  })).json();
}

/*--------------------------------END------------------------------------*/