import { Route } from 'react-router-dom';
import LoginR from '../components/user/LoginR';
import RegistroUsuario from '../components/user/RegistroUsuario';

//Simulacros
import ListaSimulacros from '../components/simulacros/SimulacrosLista';
import CrearSimulacros from '../components/simulacros/CrearSimulacros';
import SimulacroPreguntasList from '../components/simulacros/SimulacroPreguntas';
import SimPregList from '../components/simulacros/SimPregList';

//Convocatorias
import ListaConvocatorias from '../components/convocatorias/ConvocatoriasList';
import CrearConvocatoria from '../components/convocatorias/CrearConvocatoria';

//Opciones
import CrearOpcion from '../components/opciones/CrearOpciones';
import OpcionesList from '../components/opciones/OpcionesList';


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
                         <Route path="/UFPSaberPRO/simulacros/crear_simulacro" key="cresim" element={<Dashboard contenedor={<CrearSimulacros/>} />} />
                    </Route>
                    <Route key="seleccionar_preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros/seleccionar_preguntas" key="selepreg" element={<Dashboard contenedor={<SimulacroPreguntasList/>} />} />
                    </Route>
                    <Route key="simulacro_preguntas" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/simulacros/preguntas" key="simupreg" element={<Dashboard contenedor={<SimPregList/>} />} />
                    </Route>
               
                    {/* OPCIONES */}
                    <Route key="crear_opcion" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/opciones/crear_opcion" key="creopc" element={<Dashboard contenedor={<CrearOpcion/>} />} />
                    </Route>
                    <Route key="Opciones" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/pregunta/opciones" key="opc" element={<Dashboard contenedor={<OpcionesList/>} />} />
                    </Route>

                    {/* PREGUNTAS */}
                    <Route key="crear_pregunta" element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/preguntas/crear_pregunta" key="crepre" element={<Dashboard contenedor={<CrearPregunta/>} />} />
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