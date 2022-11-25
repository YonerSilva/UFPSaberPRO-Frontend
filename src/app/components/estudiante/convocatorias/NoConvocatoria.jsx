import * as React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Form } from "react-bootstrap";
import Grid from "@mui/material/Grid";

export default function NoConvocatoriaE() {

    const navigate = useNavigate();
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <h2 align="center">
                    ¡No has recibido ninguna Convocatoria! Tendras que esperar a ser invitado.
                </h2>
                <div className='mx-auto row d-flex flex-column justify-content-center align-items-center'>
                    <div className='col-12 d-flex justify-content-center'>
                        <img className="" src={process.env.PUBLIC_URL + '/images/error.png'} alt="" height={200}/>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}