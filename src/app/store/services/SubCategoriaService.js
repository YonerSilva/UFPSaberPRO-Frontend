import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;

export const getDatosGenerales = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SUBCATEGORIA.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const guardar = async (subcategoria, id_categoria) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SUBCATEGORIA.GUARDAR, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "sub_nombre": String(subcategoria.nombre).trim(),
      "sub_descripcion": String(subcategoria.descripcion).trim(),
      "categoria": parseInt(id_categoria),
      "programa": parseInt(usuario.programa.id_programa),
      "usu_creacion": parseInt(usuario.id_usuario),
    }),
  })).json();
}

export const actualizar = async (subcategoria, id_categoria) => {
  console.log(id_categoria)
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.SUBCATEGORIA.ACTUALIZAR, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id_subcategoria": parseInt(subcategoria.id_subcategoria),
      "sub_nombre": String(subcategoria.nombre).trim(),
      "sub_descripcion": String(subcategoria.descripcion).trim(),
      "categoria": parseInt(id_categoria),
      "programa": parseInt(usuario.programa.id_programa)
    }),
  })).json();
}