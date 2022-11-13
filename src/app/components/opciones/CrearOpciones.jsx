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
import * as serviceOpcion from '../../store/services/OpcionService';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { alert_error, alert_loading, alert_success } from '../../util/functions';


const theme = createTheme();

export default function CrearOpcion() {
  const { auth } = useAuth();
  const [currency, setCurrency] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEdition } = useStore();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState({
    imagen_opcion: "",
    descripcion: "",
    respuesta: "",
    pregunta: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (update) {
        serviceOpcion.actualizar(opcion).then(response => {
          serviceOpcion.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha actualizado la Opcion");
            } else {
              alert_error("¡Error!", response.message);
            }
            listarOpciones(res);
          });
        });
      } else {
        serviceOpcion.guardar(opcion).then(response => {
          serviceOpcion.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha guardado la opcion");
              setTimeout(() => { navigate("/UFPSaberPRO/opciones") }, 2000);
            } else {
              alert_error("¡Error!", response.message);
            }
            listarOpciones(res);
          });

        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listarOpciones = (response) => {
    if (response.error === null) {
      dispatch({
        type: "SET_LISTA_OPCION_PRG",
        payload: response.general
      });
      alert_loading(response.message);
    } else {
      alert_error("¡Error!", response.message);
    }
  }

  const handleChange = (e) => {
    setOpcion({ ...opcion, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    if (Object.keys(formEdition).length !== 0) {
      setUpdate(true);
      setOpcion({
        imagen_opcion: formEdition.opc_imagen,
        descripcion: formEdition.opc_descripcion,
        respuesta: formEdition.opc_respuesta,
        pregunta: formEdition.pregunta
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
                        ? "Actualizar las Opciones"
                        : "Crear las Opciones"
                    }
                  </Typography>
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="descripopcion"
                          name="descripopcion"
                          label="Descripcion de la Opcion"
                          rows={5}
                          multiline
                          fullWidth
                          value={opcion.descripcion}
                          variant="outlined"
                          maxLength="500"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          <Typography component="h3" variant="h6" align="center">
                            Añadir Imagen Opcional
                          </Typography>

                          <Button className="btn-image btn btn-danger">
                            <IconButton
                              id="opc_imagen"
                              name="opc_imagen"
                              sx={{ color: "#fff" }}
                              aria-label="upload file"
                              component="label"
                            >
                              <input
                                id="opc_imagen"
                                name="opc_imagen"
                                hidden accept="image/*" type="file" />
                              <ImageSearchIcon sx={{ mr: 1 }} />
                              Subir Imagen
                            </IconButton>
                          </Button>

                        </div>
                      </Grid>
                      <Grid item xs sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={() => { navigate(-1) }} size="large" className="btn-vc btn-danger m-2">
                          Volver
                        </Button>
                      </Grid>
                      <Grid item xs sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type='submit' size='large' className='btn-vc btn-danger m-2'>
                          {
                            update
                              ? "Actualizar"
                              : "Crear"
                          }
                        </Button>
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
      </Container >
    </ThemeProvider >
  );
}