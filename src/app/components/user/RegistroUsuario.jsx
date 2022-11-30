import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { alert_success, alert_error, verificarCamposRegister, firstCharUpper } from "../../util/functions.js";
import "../../../index.css";
import * as service from "../../store/services/UsuarioService";
import { Toaster } from 'react-hot-toast';
import { useStore } from "../../store/Provider/storeProvider.js";
import { createUserFirebase } from "../../util/firebase.js";

function RegistroUsuario() {
  const navigate = useNavigate();
  const { lista_programas, lista_roles } = useStore();

  const valores_iniciales = {
    nombre: "",
    apellido: "",
    codigo: "",
    programa: "",
    email: "",
    password: "",
    rol: ""
  };

  const [user, setUser] = useState(valores_iniciales);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = upperCase();
      service.sign_up(usuario).then(response => {
        if (response.error === null) {
          if (parseInt(usuario.rol) === 1 || parseInt(usuario.rol) === 2) {
            createUserFirebase(usuario.email, usuario.password);
          }
          alert_success(response.message, "Bienvenido (a)" + usuario.nombre + " " + usuario.apellido + ".");
          setTimeout(() => {
            navigate("/")
          }, 5000);
        } else {
          alert_error("¡Error!", response.error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
    if (name === "programa") {
      let select = document.getElementById("programa");
      if (value === "") {
        select.classList.add("invalid-select");
      } else {
        select.classList.remove("invalid-select");
      }
    }

    if (name === "rol") {
      let select = document.getElementById("rol");
      if (value === "") {
        select.classList.add("invalid-select");
      } else {
        select.classList.remove("invalid-select");
      }
    }
  };

  function upperCase() {
    const valores_iniciales = {
      nombre: firstCharUpper(user.nombre),
      apellido: firstCharUpper(user.apellido),
      codigo: user.codigo,
      programa: user.programa,
      email: user.email.toUpperCase(),
      password: user.password,
      rol: user.rol
    };
    return valores_iniciales;
  };

  return (
    <div className="maincontainer">
      <Toaster />
      <div className="container-fluid">
        <div className="login row no-gutter bg-fondo d-flex justify-content-center">
          <div className="col-md-4 bg-light fondo-form my-auto">
            <div className="bform">
              <div className="container">
                <div className="row py-3"></div>
                <div className="col-lg-10 col-xl-12 mx-auto">
                  <h3 className="text-center">U F P S a b e r P R O</h3>
                  <p className="text-muted text-center">
                    Ingresa tus datos para registrarte
                  </p>
                  <form onSubmit={handleSubmit} >
                    <div className="form-group">
                      <input
                        id="nombre"
                        type="text"
                        className="input_auth form-control rounded-pill"
                        placeholder="Nombres"
                        name="nombre"
                        value={user.nombre}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="apellido"
                        type="text"
                        className="input_auth form-control rounded-pill"
                        placeholder="Apellidos"
                        name="apellido"
                        value={user.apellido}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="codigo"
                        type="number"
                        className="input_auth form-control rounded-pill"
                        placeholder="Codigo"
                        name="codigo"
                        value={user.codigo}
                        onChange={handleInputChange}
                        onInput={(e) => e.target.value = e.target.value.slice(0, 7)}
                        required
                        maxLength={7}
                        minLength={7}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        id="programa"
                        className="form-select rounded-pill invalid-select"
                        name="programa"
                        value={user.programa}
                        onChange={handleInputChange}
                        required
                      >
                        <option key="0" defaultValue={""} hidden value="">Programa</option>
                        {
                          lista_programas.map((programa, index) => (
                            <option key={(index + 1)} value={programa.prg_codigo}>{programa.prg_codigo + "-" + programa.prg_nombre}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <select
                        id="rol"
                        className="form-select rounded-pill invalid-select"
                        name="rol"
                        value={user.rol}
                        onChange={handleInputChange}
                        required
                      >
                        <option key="0" defaultValue={""} hidden value="">Rol</option>
                        {
                          lista_roles.map((rol, index) => (
                            <option key={(index + 1)} value={rol.id_rol}>{rol.rol_nombre ? rol.rol_nombre.split("_")[1] : ""}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        id="email"
                        type="email"
                        className="input_auth form-control rounded-pill"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="password"
                        type="password"
                        className="input_auth form-control rounded-pill"
                        placeholder="Contraseña"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-check">
                      <input
                        id="customCheck1"
                        type="checkbox"
                        className="form-check-input"
                        onClick={() => {
                          let password = document.getElementById("password");
                          let checkbox = document.getElementById("customCheck1");
                          if (checkbox.checked === true) {
                            password.setAttribute("type", "text")
                          } else {
                            password.setAttribute("type", "password")
                          }
                        }}
                      />
                      <label htmlFor="customCheck1" className="form-check-label">
                        Mostrar Contraseña
                      </label>
                    </div>
                    <div className="row row-cols-2 justify-content-evenly py-3">
                      <button
                        id="btn_register_user"
                        type="button"
                        className="col-5 btn btn-danger btn-block  mb-2 rounded-pill shadow-sm"
                        onClick={() => { verificarCamposRegister() }}
                      >
                        Registrarse
                      </button>
                      <button
                        type="button"
                        className="col-5 col-sm-5 btn btn-danger btn-block  mb-2 rounded-pill shadow-sm"
                        onClick={() => navigate(`/`)}
                      >
                        Volver
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;
