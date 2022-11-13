import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

import * as service from '../../store/services/UsuarioService';
import { logout_firebase } from "../../util/firebase";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        allowedRoles?.includes(auth?.usuario?.rol?.rol_nombre)
            ? <Outlet />
            : auth.usuario !=="" && auth.token !== ""
                ? <Navigate to="/UFPSaberPRO/inicio" state={{ from: location }} replace/>
                : <>
                    {(()=>{
                        service.logout();
                        logout_firebase();
                        return <Navigate to='/' state={{ from: location }} replace />
                    })()}
                </>
    );
}

export default RequireAuth;