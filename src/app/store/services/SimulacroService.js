import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;


/*--------------------------------GENERAL------------------------------------*/

export const getDatosGenerales = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const guardar = async (simulacro) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.GUARDAR, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "simu_nombre": String(simulacro.nombre).trim(),
      "simu_descripcion": String(simulacro.descripcion).trim(),
      "simu_puntaje_maximo": String(simulacro.puntaje_maximo).trim(),
      "programa": parseInt(usuario.programa.id_programa)
    }),
  })).json();
}

export const actualizar = async (simulacro) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.GUARDAR, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id_simulacro": parseInt(simulacro.id_simulacro),
      "simu_nombre": String(simulacro.nombre).trim(),
      "simu_descripcion": String(simulacro.descripcion).trim(),
      "simu_puntaje_maximo": String(simulacro.puntaje_maximo).trim(),
      "programa": parseInt(usuario.programa.id_programa)
    }),
  })).json();
}

export const getPreguntas = async (id_simulacro) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.PREGUNTAS + "?id_simulacro=" + id_simulacro, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const getPreguntasDiferentes = async (id_simulacro) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.PREGUNTAS_DIFERENTES + "?id_simulacro=" + id_simulacro, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

/*--------------------------------END------------------------------------*/