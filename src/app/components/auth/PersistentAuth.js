import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import * as serviceAuth from '../../store/services/UsuarioService';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useStore } from "../../store/Provider/storeProvider";
import * as serviceGeneral from '../../store/services/DatoGeneralService';
import Cargador from "../extra/CargadorEventos";
import { alert_loading } from "../../util/functions";
import { logout_firebase } from "../../util/firebase";

const PersistAuth = () => {

     const auth = useAuth();
     const [loading, setLoading] = useState(true);
     const { lista_convocatorias_programa, lista_simulacros_programa, lista_categorias_programa, lista_subcategorias_programa} = useStore();
     const dispatch = useDispatch();
     const location = useLocation();

     const getDatosGenerales = async () => {
          try {
               const response = await serviceGeneral.getDatosGenerales();
               if (response.error !== null || response.error !== undefined) {
                    dispatch({
                         type: "LISTAR_DATOS_GENERAL",
                         payload: response.general
                    });
                    alert_loading(response.message);
               }
               setLoading(false);
          } catch (error) {
               console.error(error);
               setLoading(false);
          }
     }

     const validateDatosGenerales = () => {
          return !lista_convocatorias_programa && !lista_simulacros_programa && !lista_categorias_programa && !lista_subcategorias_programa;
     }

     const persist = async () => {
          if (sessionStorage.length === 0) {
               auth.setAuth({
                    token: "",
                    usuario: "",
               });
               auth.setActive(true);
               setLoading(false);
          }

          if (!auth.active) {
               const usuario = await serviceAuth.getUser();
               const token = await serviceAuth.getUserToken();
               auth.setAuth({
                    token: token,
                    usuario: usuario,
               });
               auth.setActive(true);
          }
          
          if (validateDatosGenerales) {
               getDatosGenerales();
          } else {
               setLoading(false);
          }
     }

     useEffect(() => {
          persist();
     }, []);

     return (
          <>
               {
                    (() => {
                         if (!loading) {
                              if (auth?.active) {
                                   return <Outlet />
                              } else {
                                   logout_firebase();
                                   return <Navigate to='/' state={{ from: location }} replace />
                              }
                         } else {
                              return <Cargador />
                         }
                    })()
               }
          </>
     )
}

export default PersistAuth;