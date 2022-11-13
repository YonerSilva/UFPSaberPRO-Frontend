import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;

export const getDatosGenerales = async () => {
    const token = await getUserToken();
    const usuario = await getUser();
    return await (await fetch(API_URL + API.OPCION.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })).json();
  }

  export const guardar = async (opcion) => {
    const token = await getUserToken();
    const usuario = await getUser();
    return await (await fetch(API_URL + API.OPCION.GUARDAR, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "opc_imagen": String(opcion.imagen_opcion).trim(),
        "opc_descripcion": String(opcion.descripcion).trim(),
        "opc_respuesta": String(opcion.respuesta).trim(),
        "pregunta": parseInt(opcion.pregunta)
      }),
    })).json();
  }

  export const actualizar = async (opcion) => {
    console.log(opcion)
    const token = await getUserToken();
    const usuario = await getUser();
    return await (await fetch(API_URL + API.OPCION.ACTUALIZAR, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "opc_imagen": String(opcion.imagen_opcion).trim(),
        "opc_descripcion": String(opcion.descripcion).trim(),
        "opc_respuesta": String(opcion.respuesta).trim(),
        "pregunta": parseInt(opcion.pregunta)
      }),
    })).json();
  }