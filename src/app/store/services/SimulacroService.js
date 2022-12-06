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

export const getSimulacro = async (id_simulacro) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.SIMULACRO + "/?id_simulacro=" + id_simulacro , {
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
  return await (await fetch(API_URL + API.SIMULACRO.ACTUALIZAR, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id_simulacro": parseInt(simulacro.id_simulacro),
      "simu_nombre": String(simulacro.nombre).trim(),
      "simu_descripcion": String(simulacro.descripcion).trim(),
      "simu_estado": String(simulacro.estado).trim(),
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

export const guardarPreguntas = async (formEdition) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.GUARDAR_PREGUNTAS, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "preguntas": formEdition.preguntas,
      "simulacro": parseInt(formEdition.simulacro)
    }),
  })).json();
}

export const eliminarPreguntas = async (formEdition) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.ELIMINAR_PREGUNTAS, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "preguntas": formEdition.preguntas,
      "simulacro": parseInt(formEdition.simulacro)
    }),
  })).json();
}

export const getSimulacrosConvo = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.SIMULACROS_CONVO + "?id_usuario=" + usuario.id_usuario, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const getPreguntasOpcionesSimu = async (id_simulacro) => {
  const token = await getUserToken();
  return await (await fetch(API_URL + API.SIMULACRO.PREGUNTAS_OPCIONES + "?id_simulacro=" + id_simulacro, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const presentar_simulacro = async (simu_usu, preguntas) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.PRESENTAR_SIMULACRO, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "simu_usu_presentado": simu_usu.presentado,
      "simu_usu_codigo": String(simu_usu.codigo+usuario.usu_codigo).trim(),
      "simulacro": parseInt(simu_usu.simulacro),
      "usuario": parseInt(usuario.id_usuario),
      "preguntas_respondidas": preguntas
    }),
  })).json();
}

export const getEstudiantesSimu = async (id_simulacro) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SIMULACRO.SIMULACRO_ESTUDIANTES + "/?id_simulacro=" + id_simulacro + "&id_usuario=" + usuario.id_usuario, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}
/*--------------------------------END------------------------------------*/