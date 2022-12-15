import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function HomeDoc() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ mb: 6 }}>
                <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" p={3}>
                        ¡Bienvenido a la plataforma de Pruebas Saber Pro!
                    </Typography>
                    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography component="h3" variant="h6" align="center">
                                ¡Bienvenido Docente! Para entender mejor el funcionamiento de la página, puedes ver este video que explica todas las opciones que están disponibles. Puedes contactar a soporte a través de este correo:  <b>aydufps@gmail.com</b>
                                <hr></hr>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography variant="body1">
                                <h5 className='mb-2'>Acciones que puedes hacer como docente: </h5>
                                <ul>
                                    <li>Ver una lista de preguntas segun el programa academico</li>
                                    <li>Crear preguntas segun las categoria y subcategoria</li>
                                </ul>
                                <hr></hr>

                            </Typography>
                        </Grid>                    
                    </Grid>
                    <div className="contenedor-responsivo">
                    <iframe className="iframe-responsivo" src='https://www.youtube.com/embed/yxcocZKWzFI' gesture="media" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}