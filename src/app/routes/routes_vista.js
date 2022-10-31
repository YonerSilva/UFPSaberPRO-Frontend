import { Route } from 'react-router-dom';

import LoginR from '../components/user/LoginR';
import RegistroUsuario from '../components/user/RegistroUsuario';

//Simulacros
import ListaSimulacros from '../components/simulacros/SimulacrosLista';
import CrearSimulacro from '../components/simulacros/CrearSimulacro';

//Convocatorias
import ListaConvocatorias from '../components/convocatorias/ConvocatoriasList';
import CrearConvocatoria from '../components/convocatorias/CrearConvocatoria';

//Preguntas
import PreguntasList from '../components/preguntas/PreguntasList';
import CrearPreguntas from '../components/preguntas/CrearPreguntas.jsx';


import Dashboard from '../components/home/Dashboard';
import Home from '../components/home/Home';

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
                         <Route path="/UFPSaberPRO/inicio" key="home" element={<Dashboard contenedor={<Home/>} />} />
                    </Route>, 
                    <Route key="convocatorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/convocatorias" key="conv" element={<Dashboard contenedor={<ListaConvocatorias/>} />} />
                    </Route>, 
                    <Route key="simulacros" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros" key="sims" element={<Dashboard contenedor={<ListaSimulacros/>} />} />
                    </Route>
                    <Route key="preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/preguntas" key="preg" element={<Dashboard contenedor={<PreguntasList/>} />} />
                    </Route>
                    <Route key="resultados_simulacros" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/resultados_simulacros" key="resimu" element={<Dashboard contenedor={<div>Resultados Simulacros</div>} />} />
                    </Route>
                    <Route key="revisar_preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/revisar_preguntas" key="revpreg" element={<Dashboard contenedor={<div>Revisar Preguntas</div>} />} />
                    </Route>
                    <Route key="crear_convocatorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/convocatorias/crear_convocatorias" key="creconv" element={<Dashboard contenedor={<CrearConvocatoria/>} />} />
                    </Route>
                    <Route key="crear_simulacro" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros/crear_simulacro" key="cresim" element={<Dashboard contenedor={<CrearSimulacro/>} />} />
                    </Route>
                    <Route key="crear_preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/preguntas/crear_preguntas" key="crepre" element={<Dashboard contenedor={<CrearPreguntas/>} />} />
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