import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as service from '../store/services/UsuarioService'
import { logout_firebase } from "../util/firebase";
import { alert_error, alert_logout } from "../util/functions";

const ProtectedRoutes = () => {
  async function validateToken() {
    try {
      let token = service.getUserToken();
      if (token != null && token !== "" && token !== 'null' && token !== undefined) {
        const response = await service.validateToken(token);
        if(parseInt(response.status)===200){
          return true;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
    }
    service.logout();
    logout_firebase();
    alert_error("¡Error!", "Sesión expirada.");
    return false;
  };

  const useAuth = () => {
    const user = { loggedIn: validateToken() };
    return user && user.loggedIn;
  };

  const isAuth = useAuth();

  return (
    <div>
      {
        isAuth ? <Outlet /> : <Navigate to="/UFPSaberPRO/login" />
      }
    </div>
  );
};

export default ProtectedRoutes;