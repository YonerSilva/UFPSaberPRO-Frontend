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
import * as serviceOpciones from '../../store/services/OpcionService';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { alert_error, alert_loading, alert_success, verificarImagen } from '../../util/functions';
import { cargarImagen } from "../../util/firebase";
import toast from 'react-hot-toast';

const theme = createTheme();

export default function CrearOpcion() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEditionPreg, formEditionOpc } = useStore();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [opcion, setOpcion] = useState({
    id_opcion: "",
    imagen_opcion: "",
    descripcion: "",
    respuesta: "",
    pregunta: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.promise(new Promise((resolve, reject) => {
        if (update) {
          serviceOpciones.actualizar(opcion).then(response => {
            listarOpciones(response);
            resolve();
          });
        } else {
          serviceOpciones.guardar(opcion, formEditionPreg.id_pregunta).then(response => {
            if (response.error === null) {
              if (verificarImagen()) {
                let opci = {
                  id_opcion: response.opcion.id_opcion,
                  imagen_opcion: "",
                  descripcion: response.opcion.opc_descripcion,
                  respuesta: response.opcion.opc_respuesta,
                  pregunta: response.opcion.pregunta
                }
                cargarImagen(opci.id_opcion, "opciones").then(url => {
                  if (url !== "") {
                    opci.imagen = url;
                    serviceOpciones.actualizar(opci).then(respuesta => {
                      listarOpciones(response);
                      resolve();
                    });
                  }
                });
              } else {
                listarOpciones(response);
                resolve();
              }
            } else {
              reject();
            }
          });
        }
      }), {
        loading: "Cargando...",
        error: "¡Error! \n" + "Ha ocurrido un imprevisto.",
        success: "¡Proceso Exitoso!",
      });
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
    if (Object.keys(formEditionPreg).length === 0) {
      navigate('/UFPSaberPRO/preguntas')
    }
    if (Object.keys(formEditionOpc).length !== 0) {
      setUpdate(true);
      setOpcion({
        id_opcion: formEditionOpc.id_opcion,
        imagen_opcion: formEditionOpc.opc_imagen,
        descripcion: formEditionOpc.opc_descripcion,
        respuesta: formEditionOpc.opc_respuesta,
        pregunta: formEditionOpc.pregunta
      });
    }
    setLoading(false);
    return () => {
      // Anything in here is fired on component unmount.
      dispatch({
        type: "SET_FORM_EDITION_OPC",
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
                          id="descripcion"
                          name="descripcion"
                          label="Descripcion de la Opcion"
                          rows={5}
                          multiline
                          fullWidth
                          value={opcion.descripcion}
                          onChange={handleChange}
                          variant="outlined"
                          maxLength="500"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="respuesta"
                          name="respuesta"
                          select
                          fullWidth
                          label="Seleccione si la Opcion es Correcta"
                          value={opcion.respuesta}
                          variant="outlined"

                          onChange={handleChange}
                        >
                          <MenuItem key={1} value={true}>
                            VERDADERO
                          </MenuItem>
                          <MenuItem key={2} value={false}>
                            FALSO
                          </MenuItem>

                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Seleecione una imagen (opcional)</Form.Label>
                          <Form.Control id="formFile" type="file" accept="image/png, image/jpeg" />
                          <Form.Control id="imagen" name="imagen" value={opcion.imagen} onChange={handleChange} type="text" hidden />
                        </Form.Group>
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