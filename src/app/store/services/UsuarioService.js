import Constantes from "../../routes/routes_constante";
import API from "../../routes/routes_api";

const API_URL = Constantes.SISTEMA;

/*--------------------------------USUARIO------------------------------------*/
export const sign_up = async (user) => {
     const usuario = await fetch(API_URL + API.AUTH.SIGN_UP, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               'id_usuario': null,
               'usu_nombre': String(user.nombre).trim(),
               'usu_apellido': String(user.apellido).trim(),
               'usu_codigo': String(user.codigo).trim(),
               'usu_email': String(user.email).trim(),
               'usu_password': String(user.password).trim(),
               'cod_programa': parseInt(user.programa),
               'rol': parseInt(user.rol),
          }),
     });
     return await usuario.json();
};

export const sign_in = async (user) => {
     return await (await (fetch(API_URL + API.AUTH.SIGN_IN, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               'codigo': String(user.codigo).trim(),
               'email': String(user.email).trim(),
               'password': String(user.password).trim(),
          }),
     }))).json();
};

export const userConected = async (response) => {
     sessionStorage.setItem("token", response.token);
     sessionStorage.setItem("usuario", JSON.stringify(response.usuario));
};

export const logout = () => {
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("usuario");
};

export const getUserToken = () => {
     const token = sessionStorage.getItem("token");
     return token;
};

export const getUser = async () => {
     return await JSON.parse(sessionStorage.getItem("usuario"));
};

export const validateToken = async (token) => {
     return await fetch(API_URL + API.AUTH.VALIDATE_TOKEN, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({
               'token': String(token).trim(),
          }),
     });
};

/*--------------------------------END------------------------------------*/