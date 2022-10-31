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

export default function Home() {

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
                    <Typography component="h1" variant="h4" align="center" p={2}>
                        Bienvenido a la plataforma de Pruebas Saber Pro
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={process.env.PUBLIC_URL + '/images/estudiantes.png'}
                                        alt="Estudiantes"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h4" component="div">
                                            Estudiantes Registrados
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            69
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={process.env.PUBLIC_URL + '/images/docentes.png'}
                                        alt="Docentes"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h4" component="div">
                                            Docentes Registrados
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            13
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={process.env.PUBLIC_URL + '/images/convocatoria.png'}
                                        alt="Estudiantes"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h4" component="div">
                                            Convocatorias Registrados
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            7
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={process.env.PUBLIC_URL + '/images/simulacro.png'}
                                        alt="Estudiantes"
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h4" component="div">
                                            Simulacros Presentados
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            4
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        </ThemeProvider >
    );
}