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
import { useNavigate } from 'react-router-dom';
import Cargador from "../extra/CargadorEventos";
import useAuth from "../auth/useAuth";
import { useEffect } from "react";
import * as servicePregunta from '../../store/services/PreguntasService';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { alert_error, alert_loading, alert_success, verificarImagen } from '../../util/functions';
import { cargarImagen, eliminarImagen } from "../../util/firebase";
import toast from 'react-hot-toast';

const theme = createTheme();

export default function CrearPregunta() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEdition, lista_categorias_programa, lista_subcategorias_programa } = useStore();
  const [subcategorias, setSubcategorias] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pregunta, setPregunta] = useState({
    id_pregunta: "",
    imagen: "",
    descripcion: "",
    estado: "",
    tipo: "",
    categoria: "",
    id_subcategoria: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.promise(new Promise((resolve, reject) => {
        if (update) {
          if (verificarImagen()) {
            eliminarImagen(pregunta.imagen, "preguntas").then(res => {
              let preg = pregunta;
              cargarImagen(preg.id_pregunta, "preguntas").then(url => {
                if (url !== "") {
                  preg.imagen = url;
                  servicePregunta.actualizar(preg).then(respuesta => {
                    if (respuesta.error === null) {
                      listarPreguntas(respuesta);
                      resolve();
                    } else {
                      eliminarImagen(pregunta.imagen, "preguntas");
                      reject();
                    }
                  });
                }
              });
            });
          } else {
            servicePregunta.actualizar(pregunta).then(response => {
              if (response.error === null) {
                listarPreguntas(response);
                resolve();
              } else {
                reject();
              }
            });
          }
        } else {
          servicePregunta.guardar(pregunta).then(response => {
            if (response.error === null) {
              if (verificarImagen()) {
                const preg = actualizarPregunta(response);
                cargarImagen(preg.id_pregunta, "preguntas").then(url => {
                  if (url !== "") {
                    preg.imagen = url;
                    servicePregunta.actualizar(preg).then(respuesta => {
                      listarPreguntas(response);
                      resolve();
                    });
                  }
                });
              } else {
                listarPreguntas(response);
                resolve();
              }
            }
            else {
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

  const actualizarPregunta = (response) => {
    return {
      id_pregunta: response.pregunta.id_pregunta,
      imagen: "",
      descripcion: response.pregunta.preg_descripcion,
      estado: response.pregunta.preg_estado,
      tipo: response.pregunta.preg_tipo,
      id_subcategoria: response.pregunta.id_subcategoria
    }
  }

  const listarPreguntas = (response) => {
    servicePregunta.getDatosGenerales().then(res => {
      if (response.error === null) {
        alert_success(response.message, "Se ha guardado la pregunta");
        setTimeout(() => { navigate("/UFPSaberPRO/a/preguntas") }, 2000);
      } else {
        alert_error("¡Error!", response.message);
      }
      if (res.error === null) {
        dispatch({
          type: "SET_LISTA_PREGUNTAS_PRG",
          payload: res.general
        });
        alert_loading(res.message);
      } else {
        alert_error("¡Error!", res.message);
      }
    });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPregunta(prev => ({ ...prev, [name]: value }));
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
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    if (Object.keys(formEdition).length !== 0) {
      setUpdate(true);
      setPregunta({
        id_pregunta: formEdition.id_pregunta,
        imagen: formEdition.preg_imagen,
        descripcion: formEdition.preg_descripcion,
        estado: formEdition.preg_estado,
        categoria: formEdition.subcategoria.categoria,
        tipo: formEdition.preg_tipo,
        id_subcategoria: formEdition.id_subcategoria
      });
      const subs = lista_subcategorias_programa.filter(item => parseInt(item.categoria) === parseInt(formEdition.subcategoria.categoria));
      setSubcategorias(subs);
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
                          value={pregunta.categoria}
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
                        pregunta.categoria !== ""
                          ?
                          <Grid item xs={12}>
                            <TextField
                              id="subcategoria"
                              name="id_subcategoria"
                              label="Subcategorias"
                              required
                              select
                              value={pregunta.id_subcategoria}
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
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="descripcion"
                          name="descripcion"
                          label="Descripcion de la Pregunta"
                          rows={5}
                          multiline
                          fullWidth
                          value={pregunta.descripcion}
                          onChange={handleChange}
                          variant="outlined"
                          maxLength="500"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="tipo"
                          name="tipo"
                          select
                          fullWidth
                          label="Tipo de Pregunta"
                          value={pregunta.tipo}
                          variant="outlined"
                          maxLength="1"
                          onChange={handleChange}
                        >
                          <MenuItem key={1} value={1}>
                            VERDADERO O FALSO
                          </MenuItem>
                          <MenuItem key={2} value={2}>
                            SELECCION MULTIPLE
                          </MenuItem>
                          <MenuItem key={3} value={2}>
                            COMPARACION
                          </MenuItem>
                        </TextField>
                      </Grid>
                      {
                        auth?.usuario?.rol?.rol_nombre === "ROLE_ADMINISTRADOR"
                          ?
                          <Grid item xs={12}>
                            <TextField
                              required
                              id="estado"
                              name="estado"
                              select
                              fullWidth
                              label="Estado de la Pregunta"
                              value={pregunta.estado}
                              variant="outlined"
                              maxLength="1"
                              onChange={handleChange}
                            >
                              <MenuItem key={1} value={'A'}>
                                ACTIVAR
                              </MenuItem>
                              <MenuItem key={2} value={'I'}>
                                INACTIVAR
                              </MenuItem>
                              <MenuItem key={3} value={'B'}>
                                BLOQUEAR
                              </MenuItem>
                            </TextField>
                          </Grid>
                          :
                          <></>
                      }
                      <Grid item xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Seleecione una imagen (opcional)</Form.Label>
                          <Form.Control id="formFile" type="file" accept="image/png, image/jpeg" />
                          <Form.Control id="imagen" name="imagen" value={pregunta.imagen} onChange={handleChange} type="text" hidden />
                        </Form.Group>
                      </Grid>
                      <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                        <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                          Volver
                        </Button>
                      </Grid>
                      <Grid item xs sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type='submit' size='large' className='btn btn-danger m-2'>
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
      </Container>
    </ThemeProvider>
  );
}