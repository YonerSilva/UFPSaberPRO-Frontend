import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import { Spinner } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useStore } from "../../store/Provider/storeProvider";


const tipoPregunta = [
  {
    value: "SM",
    label: "Seleccion Multiple",
  },
  {
    value: "VF",
    label: "Verdadero o Falso",
  },
];

const SeleccionPreguntas = () => {
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

export default SeleccionPreguntas;

export function CategoriaSubC() {
  const { lista_categorias_programa, lista_subcategorias_programa, formEdition } = useStore();
  const [subcategorias, setSubcategorias] = useState([]);
  const [simulacro, setSimulacro] = useState({});
  const {dispatch} = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSimulacro({...simulacro, [name]:value});
    if (name === "categoria") {
      if (value === "") {
        setSubcategorias([]);
      } else {
        if (lista_subcategorias_programa.length !== 0) {
          const subs = lista_subcategorias_programa.filter(item => parseInt(item.categoria) === parseInt(value));
          setSubcategorias(subs);
        }
      }
    }
    dispatch({
      type: "SET_FORM_EDITION",
      payload: simulacro
    });
  };

  useEffect(() => {
    if (Object.keys(formEdition).length !== 0) {
      setSimulacro(formEdition);
    }
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12}>
          <TextField
            id="categoria"
            name="categoria"
            label="Categoria"
            required
            select
            value={simulacro.categoria}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            {lista_categorias_programa.map((categoria) => (
              <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.cate_nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {
          simulacro.categoria !== ""
            ?
            <Grid item xs={12}>
              <TextField
                id="subcategoria"
                name="id_subcategoria"
                label="Subcategorias"
                required
                select
                value={simulacro.id_subcategoria}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                {subcategorias.map((subcategoria) => (
                  <MenuItem key={subcategoria.id_subcategoria} value={subcategoria.id_subcategoria}>
                    {subcategoria.sub_nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            :
            <></>
        }
      </Grid>
    </React.Fragment>
  );
}

export function NomDescSimulacro() {
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            sx={{ mt: 5 }}
            required
            id="nombre"
            label="Nombre"
            multiline
            fullWidth
            maxLength="100"
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 5 }}
            required
            id="descripcion"
            name="descripcion"
            label="Descripicion"
            rows={5}
            fullWidth
            multiline
            autoComplete="shipping postal-code"
            variant="outlined"
            maxLength="256"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export function NumPre() {
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            sx={{ mt: 5 }}
            required
            id="cardName"
            label="Cantidad de Preguntas"
            multiline
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Tipo de Preguntas"
            required
            select
            value={currency}
            onChange={handleChange}
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
          >
            {tipoPregunta.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 5 }}
            required
            id="puntaje_maximo"
            label="Puntaje Maximo"
            multiline
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export function TiempoSimulacro() {
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <TextField
            id="fecha_inicio"
            label="Fecha y Hora de Inicio"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="fecha_final"
            label="Fecha y Hora de Finalizacion"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 5 }}
            required
            id="duracion"
            label="Duracion del Simulacro"
            multiline
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export function Subcategorias() {
  const [state, setState] = React.useState({
    comEscri: false,
    razCuanti: false,
    lecCri: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { comEscri, razCuanti, lecCri } = state;
  const error = [comEscri, razCuanti, lecCri].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Subcategoria:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="comEscri" />
            }
            label="Comunicacion Escrita"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="razCuanti" />
            }
            label="Razonamiento Cuantitativo"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="lecCri" />
            }
            label="Lectura Critica"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
