import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Form } from "react-bootstrap";
import Grid from "@mui/material/Grid";

export default function NoCate({id_categoria}) {

    const navigate = useNavigate();
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <h2 align="center">
                    ¡No se encontraron Categorias! Te recomendamos crearlos o retroceder.
                </h2>
                <div className='mx-auto'>
                    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                        <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200} />
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={() => { navigate("/UFPSaberPRO/a/categorias") }} size="large" className="btn btn-danger m-2">
                                Volver
                            </Button>
                            <Button onClick={() => { navigate('/UFPSaberPRO/a/categorias/crear-categoria') }} size="large" className="btn btn-danger m-2">
                                Crear
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ThemeProvider>
    );
}