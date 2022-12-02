import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function HomeE() {

    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    const [value, setValue] = React.useState(null);

    const navigate = useNavigate();
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ mb: 6 }}>
                <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h2" align="center" p={3}>
                        Bienvenido a la plataforma de Pruebas Saber Pro!
                    </Typography>
                    <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography component="h3" variant="h6" align="center">
                                ¡Bienvenido Estudiante! Para entender mejor el funcionamiento de la página, puedes ver este video que explica todas las opciones que están disponibles. Puedes contactar a soporte a través de este correo:  <b>aydufps@gmail.com</b>
                                <hr></hr>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography variant="body1">
                                <h5 className='mb-2'>Acciones que puedes hacer como estudiante: </h5>
                                <ul>
                                    <li>Ver una lista de convocatorias a las que has sido invitado y registrarte </li>
                                    <li>Presentar Simulacros en los que te hallas inscritos</li>
                                    <li>Ver los resultados de los simulacro presentados</li>
                                </ul>
                                <hr></hr>

                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JkQ05tONYNY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}