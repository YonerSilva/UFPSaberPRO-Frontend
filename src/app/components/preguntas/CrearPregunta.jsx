import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Form } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from 'react-router-dom';
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Cargador from "../extra/CargadorEventos";
import useAuth from "../auth/useAuth";
import { useEffect } from "react";
import * as servicePregunta from '../../store/services/PreguntasService';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { alert_error, alert_loading, alert_success } from '../../util/functions';

const currencies = [
  {
    value: "Gene",
    label: "Generica",
  },
  {
    value: "Espe",
    label: "Especifica",
  },
];

const subcategorias = [
  {
    value: "CE",
    label: "Comunicacion escrita",
  },
  {
    value: "b",
    label: "Razonamiento Cuantitativo",
  },
  {
    value: "LC",
    label: "Lectura Critica",
  },
  {
    value: "CC",
    label: "Competencias Ciudadanas",
  },
  {
    value: "I",
    label: "Ingles",
  },
  {
    value: "CS",
    label: "Cuestionario Socioeconomico",
  },
];

const tipopregunta = [
  {
    value: "PA",
    label: "Pregunta Abierta",
  },
  {
    value: "PC",
    label: "Pregunta Cerrrada",
  },
];

const theme = createTheme();

export default function CrearPregunta() {
  const { auth } = useAuth();
  const [currency, setCurrency] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEdition } = useStore();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pregunta, setPregunta] = useState({
    imagen_pregunta: "",
    descripPregunta: "",
    preg_estado: "",
    subcategorias: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (update) {
        servicePregunta.actualizar(pregunta).then(response => {
          servicePregunta.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha actualizado la Pregunta");
            } else {
              alert_error("¡Error!", response.message);
            }
            listarPreguntas(res);
          });
        });
      } else {
        servicePregunta.guardar(pregunta).then(response => {
          servicePregunta.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha guardado la pregunta");
              setTimeout(() => { navigate("/UFPSaberPRO/preguntas") }, 2000);
            } else {
              alert_error("¡Error!", response.message);
            }
            listarPreguntas(res);
          });

        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listarPreguntas = (response) => {
    if (response.error === null) {
      dispatch({
        type: "SET_LISTA_PREGUNTAS_PRG",
        payload: response.general
      });
      alert_loading(response.message);
    } else {
      alert_error("¡Error!", response.message);
    }
  }

  const handleChange = (e) => {
    setPregunta({ ...pregunta, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    if (Object.keys(formEdition).length !== 0) {
      setUpdate(true);
      setPregunta({
        imagen_pregunta: formEdition.preg_imagen,
        descripPregunta: formEdition.preg_descripcion,
        preg_estado: formEdition.preg_estado,
        subcategorias: formEdition.subcategoria
      });
    }
    setLoading(false);
    return () => {
      // Anything in here is fired on component unmount.
      dispatch({
        type: "SET_FORM_EDITION",
        payload: {}
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        {
          (() => {
            if (!loading) {
              return (
                <Paper
                  variant="outlined"
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Typography component="h1" variant="h4" align="center" p={2}>
                    {
                      update
                        ? "Actualizar la Pregunta"
                        : "Crear la Pregunta"
                    }
                  </Typography>
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <TextField
                          id="categoria"
                          name="categoria"
                          label="Categoria"
                          required
                          select
                          value={currency}
                          onChange={handleChange}
                          fullWidth
                          variant="outlined"
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="subcategorias"
                          name="subcategorias"
                          label="Subcategorias"
                          required
                          select
                          value={currency}
                          onChange={handleChange}
                          fullWidth
                          variant="outlined"
                        >
                          {subcategorias.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="descripPregunta"
                          name="descripPregunta"
                          label="Descripcion de la Pregunta"
                          rows={5}
                          multiline
                          fullWidth
                          value={pregunta.descripPregunta}
                          variant="outlined"
                          maxLength="500"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography component="h3" variant="h6" align="center">
                          Añadir Imagen Opcional
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button className="btn-image btn btn-danger">
                          <IconButton
                            id="imagen_pregunta"
                            name="imagen_pregunta"
                            sx={{ color: "#fff" }}
                            aria-label="upload file"
                            component="label"
                          >
                            <input
                              id="imagen_pregunta"
                              name="imagen_pregunta"
                              hidden accept="image/*" type="file" />
                            <ImageSearchIcon sx={{ mr: 1 }} />
                            Subir Imagen
                          </IconButton>
                        </Button>
                      </Grid>
                      <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                        <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                          Volver
                        </Button>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <Button type='submit' size='medium' className='btn btn-danger m-2'>
                            {
                              update
                                ? "Actualizar"
                                : "Crear"
                            }
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Paper>
              )
            } else {
              return (<Cargador />)
            }
          })()
        }
          </Container>
    </ThemeProvider>
  );
}