import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { propertiesToJson } from 'properties-file/content'

export default function Home() {
    var properties = propertiesToJson('./application.properties');
    console.log(properties)
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
                    <Typography component="h1" variant="h3" align="center" p={5}>
                        {properties.titulo_admin}
                    </Typography>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Typography component="h3" variant="h6" align="center">
                                Para entender mejor el funcionamiento de la pagina, puedes ver este
                                video que explica todas las opciones que estan disponibles.
                                Puedes contactar a soporte atravez de este correo: 
                                <hr></hr>
                                aydufps@gmail.com
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