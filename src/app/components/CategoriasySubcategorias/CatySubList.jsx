import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Barra from '../extra/BarraBusqueda';
import Cargador from "../extra/CargadorEventos";
import NoConvocatoria from "../convocatorias/NoConvocatoria";
import { useStore } from "../../store/Provider/storeProvider";

const CatySubList = () => {

  const { lista_categorias_programa } = useStore();
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const columnas = [
    {
      text: "NOMBRE",
      dataField: "cate_nombre",
      align: "center",
      sort: true,
    },
    {
      text: "DESCRIPCION",
      dataField: "cate_descripcion",
      align: "center",
      sort: true,
    },
    {
      text: "ACCIÓN",
      dataField: "fd1",
      isDummyField: true,
      formatter: (cellContent, row) => {
        return (
          <div className="row-cols-2 row-cols-md-auto" align="center">
            <IconButton onClick={() => { navigate('/UFPSaberPRO/editar-categoria') }}
              title="Editar Categoria"
              style={{ color: "blue" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate();
              }}
              title="Eliminar Categoria"
              style={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const handleBuscar = (data) => {
    if (busqueda === "") {
      return lista_categorias_programa;
    } else {
      return data.filter((item) =>
        item.cate_nombre
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
            Lista de Categorias
          </Typography>
          {(() => {
            if (lista_categorias_programa.lengh !== 0) {
              return (
                <Barra
                  button={<button type="button" onClick={() => { navigate("/UFPSaberPRO/crear-categoria") }} className="btn btn-danger m-2">Crear Categoria</button>}
                  input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre Simulacro" placeholder="Buscar Categoria" className="form-control me-2" type="search" aria-label="Buscar" />} 
                />
              );
            }
          })()}

          <hr />
          <div className="container-fluid">
            {(() => {
              if (!loading) {
                if (lista_categorias_programa.length === 0) {
                  return <NoConvocatoria />;
                } else {
                  return (
                    <BootstrapTable
                      headerClasses="table-head"
                      classes="table-design shadow"
                      bootstrap4
                      wrapperClasses="table-responsive"
                      striped
                      bordered
                      hover
                      keyField="id_categoria"
                      data={handleBuscar(lista_categorias_programa)}
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

export default CatySubList;
