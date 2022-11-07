import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';

const currencies = [
  {
    value: "115",
    label: "Generica",
  },
  {
    value: "b",
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

export default function CategoriaySubcategorias() {

    const navigate = useNavigate();
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center" p={2}>
            Crear Categorias
          </Typography>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12}>
              <TextField
                required
                id="descripPregunta"
                name="descripPregunta"
                label="Nombre"
                multiline
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                maxlength="100"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="descripPregunta"
                name="descripPregunta"
                label="Nombre Subcategoria"
                multiline
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                maxlength="100"
              />
            </Grid>
            <Grid
              item
              xs={12}
              spacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button size="large" className="btn btn-danger">
                Añadir Subcategoria
              </Button>
            </Grid>
            <Grid
              item
              xs
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                Volver
              </Button>
              <Button size="large" className="btn btn-danger m-2">
                Crear
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
