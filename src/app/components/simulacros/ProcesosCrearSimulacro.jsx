import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import { Spinner } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useStore } from "../../store/Provider/storeProvider";

export function SeleccionPreguntas (){
  const [loading, setLoading] = useState(null);
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleBuscar = (data) => {
    if (busqueda === "") {
      return datos;
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
    await setTimeout(() => {
      setDatos([
        {
          id_simulacro: 1,
          Descripcion: "Leer cuento",
          "Subcategoria:": "Lectura Critica",
          "Tipo de Pregunta": "Seleccion Multiple",
          Acciones: <Checkbox />,
        },
      ]);
      setLoading(true);
    }, 5000);
  };
  const columnsIgnore = ["id_simulacro"];

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <div className="container">
          <Typography component="h2" variant="h5" color="dark" gutterBottom>
            Lista de Preguntas
          </Typography>
          {(() => {
            if (datos.lengh !== 0) {
              return (
                <nav className="navbar navbar-light bg-light rounded">
                  <div className="container-fluid">
                    <div className="d-flex">
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
                    </div>
                  </div>
                </nav>
              );
            }
          })()}
          <hr />
          <div className="container-fluid">
            {(() => {
              if (loading) {
                if (datos.length === 0) {
                  return (
                    <div className="text-center">
                      <h2>No hay datos.</h2>
                    </div>
                  );
                } else {
                  return <></>;
                }
              } else {
                return (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      animation="border"
                      variant="primary"
                      size=""
                      role="status"
                      style={{ marginTop: "25%", marginBottom: "25%" }}
                    />
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export function NomDescSimulacro() {
  const { formEditionSimu } = useStore();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({
      type: "SET_FORM_EDITION_SIMU",
      payload: {...formEditionSimu, [name]: value}
    })
  };

  useEffect(() => {

  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            sx={{ mt: 5 }}
            required
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formEditionSimu.nombre}
            onChange={handleChange}
            multiline
            fullWidth
            inputProps={{ maxLength: 100 }}
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="descripcion"
            name="descripcion"
            label="Descripicion"
            value={formEditionSimu.descripcion}
            onChange={handleChange}
            rows={5}
            fullWidth
            multiline
            autoComplete="shipping postal-code"
            variant="outlined"
            inputProps={{ maxLength: 256 }}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 5 }}
            required
            id="puntaje_maximo"
            name="puntaje_maximo"
            type="number"
            label="Puntaje Maximo"
            value={formEditionSimu.puntaje_maximo}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}