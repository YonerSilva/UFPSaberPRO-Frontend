import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

import * as service from '../../store/services/UsuarioService';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth.usuario !=="")
    console.log(auth.token !== "")
    return (
        allowedRoles?.includes(auth?.usuario?.rol?.rol_nombre)
            ? <Outlet />
            : auth.usuario !=="" && auth.token !== ""
                ? <Navigate to="/UFPSaberPRO/inicio" state={{ from: location }} replace/>
                : <>
                    {(()=>{
                        service.logout();
                        return <Navigate to='/' state={{ from: location }} replace />
                    })()}
                </>
    );
}

export default RequireAuth;