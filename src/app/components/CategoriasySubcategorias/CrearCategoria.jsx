import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';
import Cargador from "../extra/CargadorEventos";
import * as serviceCategoria from '../../store/services/CategoriaService';
import { useEffect } from "react";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { alert_error, alert_loading, alert_success } from '../../util/functions';

const theme = createTheme();

export default function CrearCategoria() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formEdition } = useStore();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState({
    id_categoria: "",
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (update) {
        serviceCategoria.actualizar(categoria).then(response => {
          serviceCategoria.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha actualizado la Categoria");
            } else {
              alert_error("¡Error!", response.message);
            }
            listarCategorias(res);
          });
        });
      } else {
        serviceCategoria.guardar(categoria).then(response => {
          serviceCategoria.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha guardado la categoria");
              setTimeout(() => { navigate("/UFPSaberPRO/a/categorias") }, 2000);
            } else {
              alert_error("¡Error!", response.message);
            }
            listarCategorias(res);
          });

        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listarCategorias = (response) => {
    if (response.error === null) {
      dispatch({
        type: "SET_LISTA_CATEGORIA_PRG",
        payload: response.general
      });
      alert_loading(response.message);
    } else {
      alert_error("¡Error!", response.message);
    }
  }

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    if (Object.keys(formEdition).length !== 0) {
      setUpdate(true);
      setCategoria({
        id_categoria: formEdition.id_categoria,
        nombre: formEdition.cate_nombre,
        descripcion: formEdition.cate_descripcion
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
                        ? "Actualizar la Categoria"
                        : "Crear la Categoria"
                    }
                  </Typography>
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="nombre"
                          name="nombre"
                          value={categoria.nombre}
                          label="Nombre"
                          multiline
                          fullWidth
                          autoComplete="given-name"
                          variant="outlined"
                          maxLength="100"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="descripcion"
                          name="descripcion"
                          value={categoria.descripcion}
                          label="Descripcion"
                          rows={5}
                          multiline
                          fullWidth
                          autoComplete="given-name"
                          variant="outlined"
                          maxLength="256"
                          onChange={handleChange}
                        />
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
