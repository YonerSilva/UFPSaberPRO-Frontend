import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;


/*--------------------------------GENERAL------------------------------------*/

export const getDatosGenerales = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.CONVOCATORIA.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const guardar = async (convocatoria) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.CONVOCATORIA.GUARDAR, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "convo_nombre": String(convocatoria.nombre).trim(),
      "convo_descripcion": String(convocatoria.descripcion).trim(),
      "convo_fecha_inicial": String(convocatoria.fecha_inicio).trim(),
      "convo_fecha_final": String(convocatoria.fecha_final).trim(),
      "programa": parseInt(usuario.programa.id_programa),
      "simulacro": convocatoria.simulacro!==""?parseInt(convocatoria.simulacro):null,
      "usu_creacion": parseInt(usuario.id_usuario),
    }),
  })).json();
}

/*--------------------------------END------------------------------------*/