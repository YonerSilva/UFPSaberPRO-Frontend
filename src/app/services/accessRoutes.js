import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as authService from '../auth/auth.service'
import { alert_error, alert_logout } from "../util/functions";

const ProtectedRoutes = () => {

  async function validateToken() {
    try {
      let token = authService.getUserToken();
      if (token != null && token !== "" && token !== 'null' && token !== undefined) {
        const response = await authService.validateToken(token);
        if(parseInt(response.status)===202){
          return true;
        }
      }
      throw "Acceso Denegado";
    } catch (error) {
      alert_error("Error!", "Inicie sesión de nuevo.");
      authService.logout();
      alert_logout();
    }
  };

  const useAuth = () => {
    const user = { loggedIn: validateToken() };
    return user && user.loggedIn;
  };

  const isAuth = useAuth();

  return (
    <div>
      {
        isAuth ? <Outlet /> : <Navigate to="/" />
      }
    </div>
  );
};

export default ProtectedRoutes;