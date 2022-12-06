import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import * as serviceSubCategoria from '../../store/services/SubCategoriaService';
import { alert_error, alert_loading, alert_success } from '../../util/functions';

const theme = createTheme();

export default function CrearSubCategoria() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id_categoria } = useParams();
  const { formEdition } = useStore();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subcategoria, setSubCategoria] = useState({
    id_subcategoria: "",
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (update) {
        serviceSubCategoria.actualizar(subcategoria, id_categoria).then(response => {
          serviceSubCategoria.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha actualizado la Subcategoria");
            } else {
              alert_error("¡Error!", response.message);
            }
            listarSubcategorias(res);
          });
        });
      } else {
        serviceSubCategoria.guardar(subcategoria, id_categoria).then(response => {
          serviceSubCategoria.getDatosGenerales().then(res => {
            if (response.error === null) {
              alert_success(response.message, "Se ha guardado la Subcategoria");
              setTimeout(() => { navigate("/UFPSaberPRO/a/subcategorias/" + id_categoria) }, 2000);
            } else {
              alert_error("¡Error!", response.message);
            }
            listarSubcategorias(res);
          });

        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listarSubcategorias = (response) => {
    if (response.error === null) {
      dispatch({
        type: "SET_LISTA_SUBCATEGORIA_PRG",
        payload: response.general
      });
      alert_loading(response.message);
    } else {
      alert_error("¡Error!", response.message);
    }
  }

  const handleChange = (e) => {
    setSubCategoria({ ...subcategoria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id_categoria === "undefined") {
      navigate('/UFPSaberPRO/a/categorias')
    }
    // Anything in here is fired on component mount.
    if (Object.keys(formEdition).length !== 0) {
      setUpdate(true);
      setSubCategoria({
        id_subcategoria: formEdition.id_subcategoria,
        nombre: formEdition.sub_nombre,
        descripcion: formEdition.sub_descripcion
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
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center" p={2}>
            {
              update
                ? "Actualizar la Subcategoria"
                : "Crear la Subcategoria"
            }
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="nombre"
                  name="nombre"
                  value={subcategoria.nombre}
                  label="Nombre"
                  multiline
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="descripcion"
                  name="descripcion"
                  value={subcategoria.descripcion}
                  label="Descripcion"
                  rows={5}
                  multiline
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  inputProps={{ maxLength: 256 }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button onClick={() => { navigate("/UFPSaberPRO/a/subcategorias/" + id_categoria) }} size="large" className="btn btn-danger m-2">
                  Volver
                </Button>
                <Button type='submit' size='medium' className='btn btn-danger m-2'>
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
      </Container>
    </ThemeProvider>
  );
}
