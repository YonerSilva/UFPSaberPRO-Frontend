import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";
import { getUserToken, getUser } from './UsuarioService';
const API_URL = Constantes.SISTEMA;


/*--------------------------------GENERAL------------------------------------*/

export const getDatosGenerales = async () => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.CATEGORIA.GENERAL + "/?id_usuario=" + usuario.id_usuario + "&id_programa=" + usuario.programa.id_programa, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })).json();
}

export const guardar = async (categoria) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await (await fetch(API_URL + API.CATEGORIA.GUARDAR, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "cate_nombre": String(categoria.nombre).trim(),
      "cate_descripcion": String(categoria.descripcion).trim(),
      "programa": parseInt(usuario.programa.id_programa),
      "usu_creacion": parseInt(usuario.id_usuario),
    }),
  })).json();
}

/*--------------------------------END------------------------------------*/