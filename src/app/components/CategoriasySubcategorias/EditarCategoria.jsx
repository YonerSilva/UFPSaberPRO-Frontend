import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAppContext } from "../../store/reducers/DatosGlobales";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { alert_error } from "../../util/functions";
import * as service from "../../store/services/SimulacroService";
import Cargador from "../extra/CargadorEventos";
import NoConvocatoria from "../convocatorias/NoConvocatoria";

const EditarCategoria = () => {
  const [loading, setLoading] = useState(null);
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const { state, setConvocatoriasPrg, setSimulacrosPrg } = useAppContext();
  const [convocatorias, setConvocatorias] = useState([]);
  const [simulacros, setSimulacros] = useState([]);

  const columnas = [
    {
      text: "SUBCATEGORIA",
      dataField: "text",
      align: "center",
      sort: true,
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
                  navigate();
                }}
                title="Eliminar SubCategoria"
                style={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        }
      },
    },
  ];

  const handleBuscar = (data) => {
    if (busqueda === "") {
      return simulacros;
    } else {
      return data.filter((item) =>
        item.simu_nombre
          .toString()
          .toUpperCase()
          .includes(busqueda.toUpperCase())
      );
    }
  };

  const getDatos = async () => {
    try {
      const response = await service.getDatosGenerales();
      if (response.error === null) {
        setSimulacrosPrg(response.general);
        setSimulacros(response.general.simulacros_programa);
      } else {
        alert_error("¡Error!", response.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      state.lista_convocatorias_programa[0] === "" ||
      state.lista_simulacros_programa[0] === ""
    ) {
      getDatos();
    } else {
      setSimulacros(state.lista_simulacros_programa);
      setLoading(false);
    }
  }, []);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <div className="container">
          <Typography component="h2" variant="h5" color="dark" gutterBottom>
            Editar "Nombre de la Categoria"
          </Typography>
          {(() => {
            if (datos.lengh !== 0) {
              return (
                <nav className="navbar navbar-light bg-light rounded">
                  <div className="container-fluid">
                  <div className="d-flex">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/UFPSaberPRO/crear-subcategoria");
                      }}
                      className="btn btn-danger m-2"
                    >
                      Agregar SubCategoria
                    </button>
                    </div>
                
                  </div>
                </nav>
              );
            }
          })()}

          <hr />
          <div className="container-fluid">
            {(() => {
              if (!loading) {
                if (simulacros.length === 0) {
                  return <NoConvocatoria />;
                } else {
                  return (
                    <BootstrapTable
                      headerClasses="table-head"
                      classes="table-design shadow"
                      bootstrap4
                      wrapperClasses="table-responsive"
                      rowClasses="text-nowrap"
                      striped
                      bordered
                      hover
                      keyField="id_convocatoria"
                      data={handleBuscar(convocatorias)}
                      columns={columnas}
                      pagination={paginationFactory()}
                      noDataIndication="No hay registros disponibles."
                    />
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

export default EditarCategoria;
