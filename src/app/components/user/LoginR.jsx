import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../../index.css";
import * as authService from '../../auth/auth.service.js';
import toast,{Toaster} from 'react-hot-toast';
import { alert_error } from '../../util/functions';

const Login = () => {
  const navigate = useNavigate();

  const valores_iniciales = {
    codigo: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(valores_iniciales);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = upperCase();
      const response = await authService.sign_in(usuario);
      toast.promise(new Promise((resolve, reject) => {
        if (response.token === null || response.token === undefined) {
          setTimeout(() => {reject(response.error)}, 2000);
          alert_error(response.message);
        } else {
          authService.userConected(response).then(() => {
            setTimeout(() => {
              //navigate("/productos");
              resolve();
            }, 2000);
          });
        }
      }), {
        loading: "Cargando...",
        error: "Error! \n" + response.error,
        success: response.message,
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
      codigo: user.codigo,
      email: user.email.toUpperCase(),
      password: user.password,
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
                    <h3 className="text-center">U F P S a b e r P R O</h3>
                    <p className="text-muted mb-4 py-3 text-center">
                      Ingresa tus datos para iniciar sesión
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          id="codigo"
                          type="number"
                          placeholder="Codigo"
                          autoFocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                          name="codigo" value={user.codigo} onChange={handleInputChange} required
                          maxLength={7}
                          minLength={7}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          id="inputEmail"
                          type="email"
                          placeholder="Correo Electronico"
                          autoFocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                          name="username" value={user.username} onChange={handleInputChange} required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          id="password"
                          type="password"
                          placeholder="Contraseña"
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                          name="password" value={user.password} onChange={handleInputChange} required
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
                      <div className="row row-cols-2 justify-content-evenly mt-4">
                        <button
                          type="submit"
                          className="col-5 btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Entrar
                        </button>
                        <button
                          type="button"
                          className="col-5 col-sm-5 btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                          onClick={() => navigate(`/sign_up`)}
                        >
                          Registrarse
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
    </div>
  );
};
export default Login;
