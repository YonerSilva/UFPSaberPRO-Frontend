import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Barra from '../extra/BarraBusqueda';
import Cargador from "../extra/CargadorEventos";
import NoCateSub from "./NoCateSub";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import * as serviceCategoria from '../../store/services/CategoriaService';
import { alert_error, alert_loading, alert_success } from '../../util/functions';

const SubcategoriaList = () => {

  const dispatch = useDispatch();
  const { id_categoria } = useParams();
  const [subcategorias, setSubcategorias] = useState([]);
  const { lista_subcategorias_programa } = useStore();
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const columnas = [
    {
      text: "NOMBRE",
      dataField: "sub_nombre",
      align: "center",
      sort: true,
    },
    {
      text: "DESCRIPCION",
      dataField: "sub_descripcion",
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
            <IconButton onClick={() => { updateSubCategoria(row) }}
              title='Actualizar SubConvocatoria'
              style={{ color: "blue" }}><EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const updateSubCategoria = (item) => {
    dispatch({
      type: "SET_FORM_EDITION",
      payload: item
    });
    navigate('/UFPSaberPRO/subcategorias/crear-subcategoria/'+id_categoria);
  }

  const listarSubCategorias = (response) => {
    try {
      serviceCategoria.getDatosGenerales().then(response => {
        if (response.error === null) {
          dispatch({
            type: "SET_LISTA_SUBCATEGORIA_PRG",
            payload: response.general
          });
          alert_loading(response.message);
        } else {
          alert_error("¡Error!", response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }



  const handleBuscar = (data) => {
    if (busqueda === "") {
      return subcategorias;
    } else {
      return data.filter((item) =>
        item.sub_nombre
          .toString()
          .toUpperCase()
          .includes(busqueda.toUpperCase())
      );
    }
  };

  useEffect(() => {
    if(id_categoria === "undefined"){
      navigate('/UFPSaberPRO/categorias')
    }
    if(lista_subcategorias_programa.length !== 0){
      const subs=lista_subcategorias_programa.filter(item => parseInt(item.categoria) === parseInt(id_categoria));
      setSubcategorias(subs);
    }
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <div className="container">
          <Typography component="h2" variant="h5" color="dark" gutterBottom>
            Lista de Subcategorias
          </Typography>
          {(() => {
            if (subcategorias.length !== 0) {
              return (
                <Barra
                  button={<button type="button" onClick={() => { navigate("/UFPSaberPRO/subcategorias/crear-subcategoria/"+id_categoria) }} className="btn btn-danger m-2">Crear Subcategoria</button>}
                  input={<input onChange={(e) => { setBusqueda(e.target.value) }} title="Nombre SubCategoria" placeholder="Buscar Subcategoria" className="form-control me-2" type="search" aria-label="Buscar" />}
                />
              );
            }
          })()}

          <hr />
          <div className="container-fluid">
            {(() => {
              if (!loading) {
                if (subcategorias.length === 0) {
                  return <NoCateSub id_categoria={id_categoria}/>;
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
                      keyField="id_subcategoria"
                      data={handleBuscar(subcategorias)}
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

export default SubcategoriaList;