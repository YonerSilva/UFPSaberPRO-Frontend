import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, Form } from "react-bootstrap";
import Grid from "@mui/material/Grid";

export default function NoPreguntasS() {

    const navigate = useNavigate();
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <h2 align="center">
                    ¡No se encontraron Preguntas relacionadas al Simulacro! Te recomendamos seleccionarlas.
                </h2>
                <div className='mx-auto row d-flex flex-column'>
                    <div className='col-12 d-flex justify-content-center'>
                        <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200}/>
                    </div>
                    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid item xs sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button onClick={() => { navigate(-1) }} size="large" className="btn-v btn-danger m-2">
                                Volver
                            </Button>
                        </Grid >
                        <Grid item xs sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button  onClick={() => { navigate('/UFPSaberPRO/simulacros/seleccionar_preguntas') }} size="large" className="btn-v btn-danger m-2">
                                SELECCIONAR PREGUNTAS
                            </Button>
                        </Grid >
                    </Grid>
                </div>
            </Container>
        </ThemeProvider>
    );
}