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
                    <Route key="convocatorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/convocatorias" key="conv" element={<Dashboard contenedor={<div>Convocatorias</div>} />} />
                    </Route>, 
                    <Route key="simulacros" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros" key="sims" element={<Dashboard contenedor={<div>Simulacros</div>} />} />
                    </Route>
                    <Route key="resultados_simulacros" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/resultados_simulacros" key="resimu" element={<Dashboard contenedor={<div>Resultados Simulacros</div>} />} />
                    </Route>
                    <Route key="revisar_preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/revisar_preguntas" key="revpreg" element={<Dashboard contenedor={<div>Revisar Preguntas</div>} />} />
                    </Route>
                    <Route key="subir_preguntas" element={<RequireAuth allowedRoles={[ROLES.DOCENTE, ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/subir_preguntas" key="subpreg" element={<Dashboard contenedor={<div>Subir Preguntas</div>} />} />
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