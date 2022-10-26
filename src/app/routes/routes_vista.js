import { Route } from 'react-router-dom';

import LoginR from '../components/user/LoginR';
import RegistroUsuario from '../components/user/RegistroUsuario';

import Dashboard from '../components/home/Dashboard';

import PersistAuth from '../components/auth/PersistentAuth';
import RequireAuth from '../components/auth/RequireAuth';

const ROLES = {
     'ADMIN': "ROLE_ADMINISTRADOR",
     'DOCENTE': "ROLE_DOCENTE",
     'ESTUDIANTE': "ROLE_ESTUDIANTE",
}

const routes =  {

          private: [
               <Route key="persist" element={<PersistAuth />}>
                    <Route key="inicio" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE, ROLES.ESTUDIANTE]} />}>
                         <Route path="/UFPSaberPRO/inicio" key="home" element={<Dashboard contenedor={<div>Holaaaa</div>} />} />
                    </Route>,
                    <Route key="simulacros" element={<RequireAuth allowedRoles={[ROLES.DOCENTE, ROLES.ESTUDIANTE]} />}>
                         <Route path="/UFPSaberPRO/simulacros" key="simu" element={<Dashboard contenedor={<div>Simulacros</div>} />} />
                    </Route>
               </Route>
          ],
          public: [
               {
                    path: "/",
                    name: "login",
                    element: <LoginR />
               },
               {
                    path: "/sign_up",
                    name: "sign_up",
                    element: <RegistroUsuario />
               },
          ]
}

export default routes;