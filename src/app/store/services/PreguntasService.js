import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;

export const getDatosGenerales = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.PREGUNTAS.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const guardar = async (pregunta) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.PREGUNTAS.GUARDAR, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "preg_imagen": String(pregunta.imagen).trim(),
      "preg_descripcion": String(pregunta.descripcion).trim(),
      "preg_estado": String(pregunta.estado).trim(),
      "preg_tipo": parseInt(pregunta.tipo),
      "id_subcategoria": parseInt(pregunta.id_subcategoria),
      "usu_creacion": parseInt(usuario.id_usuario)
    }),
  })).json();
}

export const actualizar = async (pregunta) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.PREGUNTAS.ACTUALIZAR, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "id_pregunta": parseInt(pregunta.id_pregunta),
        "preg_imagen": String(pregunta.imagen).trim(),
        "preg_descripcion": String(pregunta.descripcion).trim(),
        "preg_estado": String(pregunta.estado).trim(),
        "preg_tipo": parseInt(pregunta.tipo),
        "id_subcategoria": parseInt(pregunta.id_subcategoria)
    }),
  })).json();
}