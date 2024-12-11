import { Navigate, Route } from 'react-router-dom';
import LoginR from '../components/user/LoginR';
import RegistroUsuario from '../components/user/RegistroUsuario';

// ADMINISTRADOR
//Simulacros
import ListaSimulacros from '../components/simulacros/SimulacrosLista';
import CrearSimulacros from '../components/simulacros/CrearSimulacros';
import SimulacroPreguntasList from '../components/simulacros/SimulacroPreguntas';
import SimPregList from '../components/simulacros/SimPregList';
import InformacionSimulacroE from '../components/estudiante/Simulacros/InformacionSimulacro';
import Start_Examen from '../components/estudiante/Simulacros/start_examen';
import SimulacroEstudiantes from '../components/simulacros/SimulacroEstudiantes';
//Convocatorias
import ListaConvocatorias from '../components/convocatorias/ConvocatoriasList';
import CrearConvocatoria from '../components/convocatorias/CrearConvocatoria';
import ConvocatoriaEstudiantes from '../components/convocatorias/ConvocatoriaEstudiantes';
import EnviarInvitaciones from '../components/convocatorias/EnviarInvitaciones';
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
//Home
import Home from '../components/home/Home';

// ESTUDIANTE
//Convocatorias
import ListaConvocatoriasE from '../components/estudiante/convocatorias/EstConvocatoriaList';
import ListaSimulacrosE from '../components/estudiante/Simulacros/EstSimulacroList';
import ConvocatoriaInformacion from '../components/estudiante/convocatorias/ConvocatoriaInformacion';
import EstadisticaSimulacro from '../components/estudiante/Simulacros/EstadisticaSimulacro';

//Home
import HomeE from '../components/estudiante/home/Home';

// DOCENTE
//Home
import HomeDoc from '../components/docente/home/Home';
//PREGUNTAS
import PreguntasListDocente from '../components/docente/preguntas/PreguntasList';
import CrearPreguntaDocente from '../components/docente/preguntas/CrearPregunta';
//OPCIONES
import OpcionesListDoc from '../components/docente/opciones/OpcionesList';
import CrearOpcionDoc from '../components/docente/opciones/CrearOpciones';


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
               {/* ADMINISTRADOR */}
                    {/* HOME */}
                    <Route key="homeadmin" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         <Route path="/UFPSaberPRO/a/Inicio" key="homeAdmin" element={<Dashboard contenedor={<Home/>} />} />
                    </Route>
                    {/* FUNCIONALIDADES */}
                    <Route key="menuadmin" element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                         {/* CONVOCATORIAS */}
                         <Route path="/UFPSaberPRO/a/convocatorias" key="conv" element={<Dashboard contenedor={<ListaConvocatorias/>} />} />
                         <Route path="/UFPSaberPRO/a/convocatorias/crear_convocatorias" key="creconv" element={<Dashboard contenedor={<CrearConvocatoria/>} />} />
                         <Route path="/UFPSaberPRO/a/convocatorias/participantes_convocatoria" key="particonv" element={<Dashboard contenedor={<ConvocatoriaEstudiantes/>} />} />
                         <Route path="/UFPSaberPRO/a/convocatoria_estudiantes" key="convListEs" element={<Dashboard contenedor={<ConvocatoriaEstudiantes/>} />} />
                         <Route path="/UFPSaberPRO/a/convocatorias/envio_invitaciones" key="envInvi" element={<Dashboard contenedor={<EnviarInvitaciones/>} />} />
                         {/* SIMULACROS */}
                         <Route path="/UFPSaberPRO/a/simulacros" key="sims" element={<Dashboard contenedor={<ListaSimulacros/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/crear_simulacro" key="cresim" element={<Dashboard contenedor={<CrearSimulacros/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/seleccionar_preguntas" key="selepreg" element={<Dashboard contenedor={<SimulacroPreguntasList/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/preguntas" key="simupreg" element={<Dashboard contenedor={<SimPregList/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/simulacro_estudiantes" key="simuEstud" element={<Dashboard contenedor={<SimulacroEstudiantes/>} />} />
                         {/* PREGUNTAS */}
                         <Route path="/UFPSaberPRO/a/preguntas" key="preg" element={<Dashboard contenedor={<PreguntasList/>} />} />
                         <Route path="/UFPSaberPRO/a/pregunta/opciones" key="opc" element={<Dashboard contenedor={<OpcionesList/>} />} />
                         <Route path="/UFPSaberPRO/a/preguntas/crear_pregunta" key="crepre" element={<Dashboard contenedor={<CrearPregunta/>} />} />
                         {/* CATEGORIAS */}
                         <Route path="/UFPSaberPRO/a/categorias" key="cat" element={<Dashboard contenedor={<CategoriasList/>} />} />
                         <Route path="/UFPSaberPRO/a/categorias/crear-categoria" key="creacat" element={<Dashboard contenedor={<CrearCategoria/>} />} />
                         {/* SUBCATEGORIAS */}
                         <Route path="/UFPSaberPRO/a/subcategorias/:id_categoria" key="Subcat" element={<Dashboard contenedor={<SubCategoriasList/>} />} />
                         <Route path="/UFPSaberPRO/a/subcategorias/crear-subcategoria/:id_categoria" key="creasub" element={<Dashboard contenedor={<CrearSubCategoria/>} />} />
                         {/* OPCIONES */}
                         <Route path="/UFPSaberPRO/a/opciones/crear_opcion" key="creopc" element={<Dashboard contenedor={<CrearOpcion/>} />} />
                         {/* USUARIOS */}
                         <Route path="/UFPSaberPRO/a/usuarios" key="preg" element={<Dashboard contenedor={<ListaUsuarios/>} />} />
                         <Route path="/UFPSaberPRO/a/usuarios/editar-usuarios" key="editUser" element={<Dashboard contenedor={<EditarUsuario/>} />} />
                    </Route> 
               {/* ESTUDIANTE */}
                    {/* HOME */}   
                    <Route key="homeest" element={<RequireAuth allowedRoles={[ROLES.ESTUDIANTE]} />}>
                         <Route path="/UFPSaberPRO/e/Inicio" key="homeEstu" element={<Dashboard contenedor={<HomeE/>} />} />
                    </Route> 
                    {/* FUNCIONALIDADES */}
                    <Route key="menEst" element={<RequireAuth allowedRoles={[ROLES.ESTUDIANTE]} />}>
                         {/* CONVOCATORIAS */}
                         <Route path="/UFPSaberPRO/e/convocatorias" key="convE" element={<Dashboard contenedor={<ListaConvocatoriasE/>} />} />
                         <Route path="/UFPSaberPRO/e/convocatoria_info" key="convInfoE" element={<Dashboard contenedor={<ConvocatoriaInformacion/>} />} />
                         {/* SIMULACROS */}
                         <Route path="/UFPSaberPRO/e/simulacros" key="simE" element={<Dashboard contenedor={<ListaSimulacrosE/>} />} />
                         <Route path="/UFPSaberPRO/e/informacion_simulacro" key="simE" element={<Dashboard contenedor={<InformacionSimulacroE/>} />} />
                         <Route path="/UFPSaberPRO/e/presentar_simulacro" key="preSimE" element={<Dashboard contenedor={<Start_Examen/>} />} />
                         <Route path="/UFPSaberPRO/e/estadisticas_simulacro" key="simE" element={<Dashboard contenedor={<EstadisticaSimulacro/>} />} />
                    </Route> 

               {/* DOCENTE */}
                    {/* HOME */} 
                    <Route key="homeDoc" element={<RequireAuth allowedRoles={[ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/d/Inicio" key="homedoc" element={<Dashboard contenedor={<HomeDoc/>} />} />
                    </Route> 
                     {/* FUNCIONALIDADES */} 
                    <Route key="menuDoc" element={<RequireAuth allowedRoles={[ROLES.DOCENTE]} />}>
                         <Route path="/UFPSaberPRO/d/preguntas" key="predoc" element={<Dashboard contenedor={<PreguntasListDocente/>} />} />
                         <Route path="/UFPSaberPRO/d/preguntas/crear_pregunta" key="crepredoc" element={<Dashboard contenedor={<CrearPreguntaDocente/>} />} />
                         <Route path="/UFPSaberPRO/d/opciones/crear_opcion" key="creopcdoc" element={<Dashboard contenedor={<CrearOpcionDoc/>} />} />
                         <Route path="/UFPSaberPRO/d/preguntas/opciones_list" key="listopcdoc" element={<Dashboard contenedor={<OpcionesListDoc/>} />} />
                    </Route> 

               </Route>
          ],
          public: [
               {
                    path: "/",
                    name: "login_replace",
                    element: <Navigate to="/UFPSaberPRO/login" replace />
               },
               {
                    path: "/UFPSaberPRO/login",
                    name: "login",
                    element: <LoginR/>
               },
               {
                    path: "/UFPSaberPRO/sign_up",
                    name: "sign_up",
                    element: <RegistroUsuario/>
               },
          ]
}

export default routes;