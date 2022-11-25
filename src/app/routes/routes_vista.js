import { Route } from 'react-router-dom';
import LoginR from '../components/user/LoginR';
import RegistroUsuario from '../components/user/RegistroUsuario';

// ADMINISTRADOR
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
//Home
import Home from '../components/home/Home';

// ESTUDIANTE
//Convocatorias
import ListaConvocatoriasE from '../components/estudiante/convocatorias/EstConvocatoriaList';
import ListaSimulacrosE from '../components/estudiante/Simulacros/EstSimulacroList';
import ConvocatoriaInformacion from '../components/estudiante/convocatorias/ConvocatoriaInformacion';

//Home
import HomeE from '../components/estudiante/home/Home';

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
                         {/* SIMULACROS */}
                         <Route path="/UFPSaberPRO/a/simulacros" key="sims" element={<Dashboard contenedor={<ListaSimulacros/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/crear_simulacro" key="cresim" element={<Dashboard contenedor={<CrearSimulacros/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/seleccionar_preguntas" key="selepreg" element={<Dashboard contenedor={<SimulacroPreguntasList/>} />} />
                         <Route path="/UFPSaberPRO/a/simulacros/preguntas" key="simupreg" element={<Dashboard contenedor={<SimPregList/>} />} />
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
                    <Route key="menuadmin" element={<RequireAuth allowedRoles={[ROLES.ESTUDIANTE]} />}>
                         {/* CONVOCATORIAS */}
                         <Route path="/UFPSaberPRO/e/convocatorias" key="convE" element={<Dashboard contenedor={<ListaConvocatoriasE/>} />} />
                         {/* SIMULACROS */}
                         <Route path="/UFPSaberPRO/e/simulacros" key="simE" element={<Dashboard contenedor={<ListaSimulacrosE/>} />} />

                         <Route path="/UFPSaberPRO/e/convocatoria_info" key="convInfo" element={<Dashboard contenedor={<ConvocatoriaInformacion/>} />} />
                    </Route> 
               </Route>
          ],
          public: [
               {
                    path: "/",
                    name: "login",
                    element: <LoginR/>
               },
               {
                    path: "/sign_up",
                    name: "sign_up",
                    element: <RegistroUsuario/>
               },
          ]
}

export default routes;