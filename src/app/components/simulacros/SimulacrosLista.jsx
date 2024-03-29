import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Cargador from "../extra/CargadorEventos";
import Barra from "../extra/BarraBusqueda";
import NoSimulacros from "./NoSimulacros";
import { useStore, useDispatch } from "../../store/Provider/storeProvider";
import ToolkitProvider, {
     Search,
     CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const ListaSimulacros = () => {
     const dispatch = useDispatch();
     const { lista_simulacros_programa } = useStore();
     const [loading, setLoading] = useState(true);
     const [busqueda, setBusqueda] = useState("");
     const navigate = useNavigate();

     const columnas = [
          {
               text: "NOMBRE",
               dataField: "simu_nombre",
               align: "center",
               sort: true,
          },
          {
               text: "DESCRIPCION",
               dataField: "simu_descripcion",
               align: "center",
               sort: true,
          },
          {
               text: "PUNTAJE MAX",
               dataField: "simu_puntaje_maximo",
               align: "center",
               sort: true,
          },
          {
               text: "ESTADO",
               dataField: "simu_estado",
               align: "center",
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.simu_estado) {
                         case "A":
                              return <span className="estado-color-activo">ACTIVO</span>;
                         case "I":
                              return <span className="estado-color-inactivo">INACTIVO</span>;
                         case "B":
                              return <span className="estado-color-bloqueado">BLOQUEADO</span>;
                         default:
                              return <></>;
                    }
               },
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.simu_estado === "I") {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                                   <IconButton
                                        onClick={() => {
                                             actualizarSimulacro(row);
                                        }}
                                        title="Actualizar Simulacro"
                                        style={{ color: "blue" }}
                                   >
                                        <EditIcon />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => {
                                             navigate();
                                        }}
                                        title="Eliminar Simulacro"
                                        style={{ color: "red" }}
                                   >
                                        <DeleteIcon />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => {
                                             verPreguntas(row);
                                        }}
                                        title="Ver Preguntas"
                                        style={{ color: "gray" }}
                                   >
                                        <VisibilityIcon />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => {
                                             simulacrosPresentados(row);
                                        }}
                                        title="Ver Estudiantes"
                                        style={{ color: "blue" }}
                                   >
                                        <RecentActorsIcon />
                                   </IconButton>
                              </div>
                         );
                    } else {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                                   <IconButton
                                        onClick={() => {
                                             verPreguntas(row);
                                        }}
                                        title="Ver Preguntas"
                                        style={{ color: "gray" }}
                                   >
                                        <VisibilityIcon />
                                   </IconButton>
                                   <IconButton
                                        onClick={() => {
                                             simulacrosPresentados(row);
                                        }}
                                        title="Ver Estudiantes"
                                        style={{ color: "blue" }}
                                   >
                                        <RecentActorsIcon />
                                   </IconButton>
                              </div>
                         );
                    }
               },
          },
     ];

     const simulacrosPresentados = async (item) => {
          dispatch({
               type: "SET_FORM_EDITION_SIMU",
               payload: item,
          });
          navigate("/UFPSaberPRO/a/simulacros/simulacro_estudiantes");
     };

     const actualizarSimulacro = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_SIMU",
               payload: item,
          });
          navigate("/UFPSaberPRO/a/simulacros/crear_simulacro");
     };

     const verPreguntas = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_SIMU",
               payload: item,
          });
          navigate("/UFPSaberPRO/a/simulacros/preguntas");
     };

     const handleBuscar = (data) => {
          if (busqueda === "") {
               return lista_simulacros_programa;
          } else {
               return data.filter((item) =>
                    item.simu_nombre
                         .toString()
                         .toUpperCase()
                         .includes(busqueda.toUpperCase())
               );
          }
     };

     useEffect(() => {
          setLoading(false);
     }, []);

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Simulacros
                         </Typography>
                         {(() => {
                              if (lista_simulacros_programa.length !== 0) {
                                   return (
                                        <Barra
                                             button={
                                                  <button
                                                       type="button"
                                                       onClick={() => {
                                                            navigate("/UFPSaberPRO/a/simulacros/crear_simulacro");
                                                       }}
                                                       className="btn btn-danger m-2"
                                                  >
                                                       Crear Simulacro
                                                  </button>
                                             }
                                             input={
                                                  <input
                                                       onChange={(e) => {
                                                            setBusqueda(e.target.value);
                                                       }}
                                                       title="Nombre Simulacro"
                                                       placeholder="Buscar Simulacro"
                                                       className="form-control me-2"
                                                       type="search"
                                                       aria-label="Buscar"
                                                  />
                                             }
                                        />
                                   );
                              }
                         })()}

                         <hr />
                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (lista_simulacros_programa.length === 0) {
                                             return <NoSimulacros />;
                                        } else {
                                             return (

                                                  <React.Fragment>
                                                       <BootstrapTable
                                                            headerClasses="table-head"
                                                            classes="table-design shadow"
                                                            wrapperClasses="table-responsive"
                                                            striped
                                                            bordered
                                                            hover
                                                            bootstrap4
                                                            keyField="id_simulacro"
                                                            data={handleBuscar(lista_simulacros_programa)}
                                                            columns={columnas}
                                                            pagination={paginationFactory()}
                                                            noDataIndication="No hay registros disponibles."
                                                       />

                                                  </React.Fragment>
                                             );
                                        }
                                   } else {
                                        return <Cargador />;
                                   }
                              })()}
                         </div>
                    </div>
               </ResponsiveContainer>
          </React.Fragment>
     );
};

export default ListaSimulacros;
