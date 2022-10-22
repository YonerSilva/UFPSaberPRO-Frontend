import Constantes from "../routes/routes_constante";
import API from "../routes/routes_api";

const API_URL = Constantes.SISTEMA;

/*--------------------------------GENERAL------------------------------------*/



/*--------------------------------END------------------------------------*/

/*--------------------------------USUARIO------------------------------------*/
export const sign_up = async (user) => {
  const usuario = await fetch(API_URL + API.AUTH.SIGN_UP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'nombres': String(user.nombres).trim(),
      'apellidos': String(user.apellidos).trim(),
      'username': String(user.username).trim(),
      'password': String(user.password).trim(),
      'roles':["admin"],
    }),
  });
  return usuario;
};

export const sign_in = async (user) => {
  return await (await (fetch(API_URL + API.AUTH.SIGN_IN,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': String(user.username).trim(),
      'password': String(user.password).trim(),
    }),
  }))).json();
};

export const userConected = async (response) => {
  const user = {
    "id_usuario": response.usuario.id_usuario,
    "nombres": response.usuario.nombres,
    "apellidos": response.usuario.apellidos,
    "username": response.usuario.username,
  }
  sessionStorage.setItem("token", response.token);
  sessionStorage.setItem("usuario", JSON.stringify(user));
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
  return await fetch(API_URL + API.AUTH.VALIDATE_TOKEN,{
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

/*--------------------------------PRODUCTOS------------------------------------*/

export const addProducto = async (producto) => {
  const token = await getUserToken();
  return await fetch(API_URL + "api/productos/add", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
    body: JSON.stringify({
      'nombre': String(producto.nombre).trim(),
      'cantidad': parseInt(producto.cantidad),
      'valor_unitario': parseFloat(producto.valor_unitario),
      'id_usuario': parseInt(producto.id_usuario),
    }),
  })
}

export const updateProducto = async (id_producto,producto) => {
  const token = await getUserToken();
  return await fetch(API_URL + "api/productos/update", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
    body: JSON.stringify({
      "id_producto": parseInt(id_producto),
      'nombre': String(producto.nombre).trim(),
      'cantidad': parseInt(producto.cantidad),
      'valor_unitario': parseFloat(producto.valor_unitario),
      'id_usuario': parseInt(producto.id_usuario),
    }),
  })
}

export const deleteProducto = async (id_producto) => {
  const token = await getUserToken();
  const usuario = await getUser();
  return await fetch(API_URL + "api/productos/delete", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
    body: JSON.stringify({
      "id_producto": parseInt(id_producto),
      'id_usuario': parseInt(usuario.id_usuario),
    }),
  })
}

export const getProductos = async ()=>{
  const token = await getUserToken();
  return await (await fetch(API_URL + "api/productos/all",{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  })).json();
}

export const getProductosDisponibles = async ()=>{
  const token = await getUserToken();
  return await (await fetch(API_URL + "api/productos/getAvailables",{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  })).json();
}

export const getProducto = async (id_producto)=>{
  const token = await getUserToken();
  return await (await fetch(API_URL + "api/productos/get?id_producto="+id_producto,{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  })).json();
}

export const venderProducto = async (datos) => {
  const usuario = await getUser();
  const token = await getUserToken();
  return await (await fetch(API_URL + "api/productos/sell", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
    body: JSON.stringify({
      'id_producto': parseInt(datos.id_producto),
      'cantidad_vendida': parseInt(datos.cantidad),
      'fecha_venta': String(datos.fecha_venta).trim(),
      'id_usuario': parseInt(usuario.id_usuario),
    }),
  })).json();
}

export const getUsuarioProducto = async (id_producto)=>{
  const token = await getUserToken();
  return await (await fetch(API_URL + "api/productos/getUsuarioProducto?id_producto="+id_producto,{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  })).json();
}
/*--------------------------------END------------------------------------*/

/*--------------------------------VENTAS------------------------------------*/

export const getVentas = async ()=>{
  const token = await getUserToken();
  return await fetch(API_URL + "api/ventas/all",{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  });
}

export const getVentasMesActual = async ()=>{
  const token = await getUserToken();
  return await fetch(API_URL + "api/ventas/getVentasMesActual",{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
    },
  });
}
/*--------------------------------END------------------------------------*/