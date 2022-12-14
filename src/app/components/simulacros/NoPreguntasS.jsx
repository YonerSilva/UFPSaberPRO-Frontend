import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { Button, Form } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import { useStore } from '../../store/Provider/storeProvider';
import { useEffect } from 'react';

export default function NoPreguntasS() {

    const { formEditionSimu } = useStore();
    const navigate = useNavigate();
    const theme = createTheme();

    useEffect(() => {
        if (Object.keys(formEditionSimu).length === 0) {
            navigate('/UFPSaberPRO/a/simulacros');
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <h2 align="center">
                    ¡No se encontraron Preguntas relacionadas al Simulacro! Te recomendamos seleccionarlas.
                </h2>
                <div className='mx-auto'>
                    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                        <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200} />
                        {
                            formEditionSimu.simu_estado === 'I'
                                ?
                                <>
                                    <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                                        <Button onClick={() => { navigate("/UFPSaberPRO/a/simulacros") }} size="large" className="btn btn-danger m-2">
                                            Volver
                                        </Button>
                                        <Button onClick={() => { navigate('/UFPSaberPRO/a/simulacros/seleccionar_preguntas') }} size="large" className="btn btn-danger m-2">
                                            Seleccionar Preguntas
                                        </Button>
                                    </Grid >
                                </>
                                :
                                <Grid item xs sm={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={() => { navigate("/UFPSaberPRO/a/simulacros") }} size="large" className="btn-v btn-danger m-2">
                                        Volver
                                    </Button>
                                </Grid >
                        }
                    </Grid>
                </div>
            </Container>
        </ThemeProvider>
    );
}