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
import CrearPregunta from '../components/preguntas/CrearPregunta'; 

//Categoria
import CrearCategoria from '../components/CategoriasySubcategorias/CrearCategoria';
import CrearSubCategoria from '../components/CategoriasySubcategorias/CrearSubCategoria';
import CategoriasList from '../components/CategoriasySubcategorias/CategoriaList';
import SubCategoriasList from '../components/CategoriasySubcategorias/SubCategoriaList';

//Usuarios
import ListaUsuarios from '../components/usuarios/UsuariosList';
import EditarUsuario from '../components/usuarios/EditarUsuario';
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

                    {/* MENU DASHBOARD */}
                    <Route key="inicio" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE, ROLES.ESTUDIANTE]} />}>
                         <Route path="/UFPSaberPRO/Inicio" key="home" element={<Dashboard contenedor={<Home/>} />} />
                    </Route> 
                    <Route key="convocatorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/convocatorias" key="conv" element={<Dashboard contenedor={<ListaConvocatorias/>} />} />
                    </Route> 
                    <Route key="simulacros" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros" key="sims" element={<Dashboard contenedor={<ListaSimulacros/>} />} />
                    </Route>
                    <Route key="categorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/categorias" key="cat" element={<Dashboard contenedor={<CategoriasList/>} />} />
                    </Route>
                    <Route key="preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/preguntas" key="preg" element={<Dashboard contenedor={<PreguntasList/>} />} />
                    </Route>
                    <Route key="usuarios" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/usuarios" key="preg" element={<Dashboard contenedor={<ListaUsuarios/>} />} />
                    </Route>

                    {/* CONVOCATORIAS */}
                    <Route key="crear_convocatorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/convocatorias/crear_convocatorias" key="creconv" element={<Dashboard contenedor={<CrearConvocatoria/>} />} />
                    </Route>

                    {/* CATEGORIA */}
                    <Route key="crear_categoria" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/categorias/crear-categoria" key="creacat" element={<Dashboard contenedor={<CrearCategoria/>} />} />
                    </Route>

                    {/* SUBCATEGORIA */}
                    <Route key="SubCategorias" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/subcategorias/:id_categoria" key="Subcat" element={<Dashboard contenedor={<SubCategoriasList/>} />} />
                    </Route>
                    <Route key="crearsubcategoria" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/subcategorias/crear-subcategoria/:id_categoria" key="creasub" element={<Dashboard contenedor={<CrearSubCategoria/>} />} />
                    </Route>

                    {/* SIMULACRO */}
                    <Route key="crear_simulacro" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros/crear_simulacro" key="cresim" element={<Dashboard contenedor={<CrearSimulacro/>} />} />
                    </Route>

                    {/* PREGUNTAS */}
                    <Route key="crear_pregunta" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/preguntas/crear_pregunta" key="crepreSM" element={<Dashboard contenedor={<CrearPregunta/>} />} />
                    </Route>

                    {/* USUARIOS */}
                    <Route key="editUser" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/usuarios/editar-usuarios" key="editUser" element={<Dashboard contenedor={<EditarUsuario/>} />} />
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