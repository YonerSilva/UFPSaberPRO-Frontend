import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';

export default function NoPreguntas() {

    const navigate = useNavigate();
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <h2 align="center">
                    ¡No se encontraron Preguntas! Te recomendamos crearlos o retroceder.
                </h2>
                <div className='mx-auto row d-flex flex-column'>
                    <div className='col-12 d-flex justify-content-center'>
                        <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200}/>
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                        <button type='button' onClick={() => { navigate('/UFPSaberPRO/preguntas/crear_pregunta') }} className='btn btn-danger m-2'>Crear Pregunta</button>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}