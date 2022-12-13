import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Home() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg">
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" p={3}>
                        Bienvenido a la plataforma de Pruebas Saber Pro!
                    </Typography>
                    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography component="h3" variant="h6" align="center">
                                ¡Bienvenido! Para entender mejor el funcionamiento de la página, puedes ver este video que explica todas las opciones que están disponibles. Puedes contactar a soporte a través de este correo:  <b>aydufps@gmail.com</b>
                                <hr></hr>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center", p: 3 }}
                        >
                            <Typography variant="body1">
                                <h5 className='mb-2'>Acciones que puedes hacer como administrador: </h5>
                                <ul>
                                    <li>Crear convocatorias </li>
                                    <li>Divulgar convocatorias </li>
                                    <li>Crear simulacros </li>
                                    <li>Ver un listado de preguntas con acciones de eliminar, editar y admitir </li>
                                    <li>Crear categorias y subcategorias</li>
                                    <li>Crear preguntas segun la categoria y subcategoria</li>
                                    <li>Ver una listado de correos de estudiantes  que se registraron en la convocatoria</li>
                                    <li>Cargar documentos tipo hoja de calculo con un listado de correos para generar invitaciones</li>
                                    <li>Ver un listado de los estudiantes que presentan un simulacro</li>
                                </ul>
                                <hr></hr>

                            </Typography>
                        </Grid>
                    </Grid>
                            <div className="contenedor-responsivo">
                            <iframe className="iframe-responsivo" src='https://www.youtube.com/embed/7yHcu6fNK_8' gesture="media" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}