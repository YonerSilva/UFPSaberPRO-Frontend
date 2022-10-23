import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { alert_success, alert_error, verificarCamposRegister, firstCharUpper } from "../../util/functions.js";
import "../../../index.css";

import * as authService from "../../auth/auth.service";
import { Toaster } from 'react-hot-toast';

function RegistroUsuario() {
  const navigate = useNavigate();

  const valores_iniciales = {
    nombre: "",
    apellido: "",
    codigo: "",
    programa: "",
    email: "",
    password: "",
    roles: []
  };

  const [user, setUser] = useState(valores_iniciales);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = upperCase();
      authService.sign_up(usuario).then(response => {
        if (parseInt(response.status) === 201) {
          alert_success(response.message, "Bienvenido " + usuario.nombres + " " + usuario.apellidos + ".");
          navigate("/");
        } else {
          alert_error("Error!", "No se pudo crear el usuario.");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(prevUser=>({ ...prevUser, [name]: value }));
    console.log(name);
    if (name === "programa") {
      let select = document.getElementById("programa");
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
      roles: user.roles
    };
    return valores_iniciales;
  };

  return (
    <div className="maincontainer">
      <Toaster />
      <div className="container-fluid">
        <div className="login row no-gutter bg-fondo d-flex justify-content-center">
          <div className="col-md-4 bg-light fondo-form my-auto">
            <div className="bform" row no-gutter bg-fondo d-flex justify-content-center>
              <div className="container">
                <div className="row py-3"></div>
                <div className="col-lg-10 col-xl-12 mx-auto">
                  <h3 className="text-center">U F P S a b e r P R O</h3>
                  <p className="text-muted mb-4 py-3 text-center">
                      Ingresa tus datos para registrarte
                    </p>
                  <form onSubmit={handleSubmit} >
                    <div className="form-group">
                      <input
                        id="nombre"
                        type="text"
                        className="form-control rounded-pill"
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
                        className="form-control rounded-pill"
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
                        className="form-control rounded-pill"
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
                        <option defaultValue={""} hidden value="">Programa</option>
                        <option value="Original">Original</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        id="email"
                        type="email"
                        className="form-control rounded-pill"
                        placeholder="Email"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="password"
                        type="password"
                        className="form-control rounded-pill"
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
                    <div className="row row-cols-2 justify-content-evenly mt-4 py-3">
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
