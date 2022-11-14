import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;

export const getOpcionesPregunta = async (id_pregunta) => {
    const token = await getUserToken();
    return await (await fetch(API_URL + API.OPCION.OPCIONES + "?id_pregunta=" + id_pregunta, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })).json();
  }

  export const guardar = async (opcion, id_pregunta) => {
    const token = await getUserToken();

    return await (await fetch(API_URL + API.OPCION.GUARDAR, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "opc_imagen": String(opcion.imagen_opcion).trim(),
        "opc_descripcion": String(opcion.descripcion).trim(),
        "opc_respuesta": opcion.respuesta,
        "pregunta": parseInt(id_pregunta)
      }),
    })).json();
  }

  export const actualizar = async (opcion) => {
    console.log(opcion)
    const token = await getUserToken();
    return await (await fetch(API_URL + API.OPCION.ACTUALIZAR, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id_opcion":parseInt(opcion.id_opcion),
        "opc_imagen": String(opcion.imagen_opcion).trim(),
        "opc_descripcion": String(opcion.descripcion).trim(),
        "opc_respuesta": opcion.respuesta,
        "pregunta": parseInt(opcion.pregunta)
      }),
    })).json();
  }