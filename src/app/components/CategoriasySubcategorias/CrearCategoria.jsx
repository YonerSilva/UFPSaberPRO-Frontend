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
import * as serviceCategoria  from '../../store/services/CategoriaService';
import { useEffect } from "react";
import { alert_error, alert_success } from "../../util/functions";

const theme = createTheme();

export default function CategoriaySubcategorias() {

  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      serviceCategoria.guardar(categoria).then(response => {
        if (response.error === null) {
          alert_success(response.message, "Se ha guardado la convocatoria");
        } else {
          alert_error("¡Error!", response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCategoria({...categoria, [e.target.name]:e.target.value});
  };

  useEffect(()=>{
    setLoading(false);
  },[]);

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
                    Crear Categorias
                  </Typography>
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="nombre"
                          name="nombre"
                          value={categoria.nombre}
                          label="Nombre de la Categoria"
                          multiline
                          fullWidth
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
                          label="Nombre de la Descripcion"
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
                        <Button type="submit" size="large" className="btn btn-danger m-2">
                          Crear
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
