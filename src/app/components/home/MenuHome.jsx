import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//*
//* Icon Home
import HomeIcon from '@mui/icons-material/Home';
//* Icon Convocatoria
import CampaignIcon from '@mui/icons-material/Campaign';
//*Icon Simulacro
import MenuBookIcon from '@mui/icons-material/MenuBook';
//*Icon Subir Preguntas
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//*Icon Revisar Preguntas
import FindInPageIcon from '@mui/icons-material/FindInPage';
//*Icon Resultados Simulacros
import AssignmentIcon from '@mui/icons-material/Assignment';
//*
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
                                   <HomeIcon sx={{ color: "red" }} />
                              </ListItemIcon>
                              <ListItemText primary="Inicio" />
                         </ListItemButton>
                         :
                         <div hidden></div>
               }
               {
                    role_admin
                         ?

                         <><ListItemButton onClick={() => { navigate('/UFPSaberPRO/convocatorias'); } }>
                              <ListItemIcon>
                                   <CampaignIcon sx={{ color: "red" }} />
                              </ListItemIcon>
                              <ListItemText primary="Convocatorias" />
                         </ListItemButton>
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/simulacros'); } }>
                                   <ListItemIcon>
                                        <MenuBookIcon sx={{ color: "red" }} />
                                   </ListItemIcon>
                                   <ListItemText primary="Simulacros" />
                              </ListItemButton>
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/resultados_simulacros'); } }>
                                   <ListItemIcon>
                                        <AssignmentIcon sx={{ color: "red" }} />
                                   </ListItemIcon>
                                   <ListItemText primary="Resultados Simulacros" />
                              </ListItemButton>
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/revisar_preguntas'); } }>
                                   <ListItemIcon>
                                        <FindInPageIcon sx={{ color: "red" }} />
                                   </ListItemIcon>
                                   <ListItemText primary="Revisar Preguntas" />
                              </ListItemButton></>
                         :
                         <div hidden></div>
               }
               {
                    role_docente || role_admin
                         ?
                         <ListItemButton onClick={() => { navigate('/UFPSaberPRO/subir_preguntas'); } }>
                                   <ListItemIcon>
                                        <CloudUploadIcon sx={{ color: "red" }} />
                                   </ListItemIcon>
                                   <ListItemText primary="Subir Preguntas" />
                         </ListItemButton>
                         :
                         <div hidden></div>
               }
          </React.Fragment>
     );
}