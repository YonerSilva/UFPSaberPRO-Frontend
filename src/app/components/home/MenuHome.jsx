import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from '@mui/icons-material/Inventory';
import useAuth from "../auth/useAuth";



export default function MenuList() {
     const [role_admin, setRole_Admin] = React.useState(false);
     const [role_docente, setRole_Docente] = React.useState(false);
     const [role_estudiante, setRole_Estudiante] = React.useState(false);

     const { auth } = useAuth();

     const navigate = useNavigate();

     const getRoles_User = () => {
          try {
               switch (auth?.usuario?.rol?.rol_nombre) {
                    case "ROLE_ADMINISTRADOR":
                         setRole_Admin(true);
                         break;
                    case "ROLE_DOCENTE":
                         setRole_Docente(true);
                         break;
                    case "ROLE_ESTUDIANTE":
                         setRole_Estudiante(true);
                         break;
                    default:
                         break;
               }
          } catch (error) {
               console.log(error);
          }
     }

     React.useEffect(() => {
          getRoles_User();
     }, [role_admin, role_docente, role_estudiante]);

     return (
          <React.Fragment>
               {
                    role_admin || role_docente || role_estudiante
                         ?
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/inicio') }}>
                              <ListItemIcon>
                                   <InventoryIcon sx={{ color: "red" }} />
                              </ListItemIcon>
                              <ListItemText primary="Inicio" />
                         </ListItemButton>
                         :
                         <div hidden></div>
               }
               {
                    role_docente || role_estudiante
                         ?
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/inicio') }}>
                              <ListItemIcon>
                                   <InventoryIcon sx={{ color: "red" }} />
                              </ListItemIcon>
                              <ListItemText primary="Simulacros" />
                         </ListItemButton>
                         :
                         <div hidden></div>
               }
          </React.Fragment>
     );
}