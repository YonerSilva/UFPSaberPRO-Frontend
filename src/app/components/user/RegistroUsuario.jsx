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
    setUser({ ...user, [e.target.name]: e.target.value });
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
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4 text-center">Registrarse</h3>
                    <form onSubmit={handleSubmit} >
                      <div className="form-group">
                        <label className="required">Nombres</label>
                        <input
                          id="nombre"
                          type="text"
                          className="form-control"
                          placeholder="Nombres"
                          name="nombre"
                          value={user.nombre}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="required">Apellidos</label>
                        <input
                          id="apellido"
                          type="text"
                          className="form-control"
                          placeholder="Apellidos"
                          name="apellido"
                          value={user.apellido}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="required">Codigo</label>
                        <input
                          id="codigo"
                          type="number"
                          className="form-control"
                          placeholder="Codigo"
                          name="codigo"
                          value={user.codigo}
                          onChange={handleInputChange}
                          required
                          maxLength={7}
                          minLength={7}
                        />
                      </div>
                      <div className="form-group">
                        <label className="required">Programa</label>
                        <select
                          id="programa"
                          className="form-select"
                          name="programa"
                          value={user.programa}
                          onChange={handleInputChange}
                          required
                        >
                          <option defaultValue={""} hidden value="">Programa</option>
                          <option value="Original">Original</option>
                          <option value="Generico">Generico</option>
                          <option value="Alternativo">Alternativo</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="required">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="username"
                          value={user.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="required">Contraseña</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
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
                      <div className="d-flex justify-content-center">
                        <button
                          id="btn_register_user"
                          type="button"
                          className="btn btn-success btn-block my-2"
                          onClick={() => { verificarCamposRegister() }}
                        >
                          Registrarse
                        </button>
                      </div>
                      <p className="forgot-password text-right">
                        Ya está registrado{" "}
                        <a type="button" href="/">
                          iniciar sesión?
                        </a>
                      </p>
                    </form>
                  </div>
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
