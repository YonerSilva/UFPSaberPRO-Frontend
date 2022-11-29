import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import { useState } from 'react';

const InformacionSimulacro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formEditionSimu } = useStore();

    const empezarSimulacro = () => {
        Swal.fire({
            title: '¿Quieres comenzar el examen?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Empezar',
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/UFPSaberPRO/e/presentar_simulacro");
            }
        });
    }

    useEffect(() => {
        if (Object.keys(formEditionSimu).length === 0) {
            navigate("/UFPSaberPRO/e/simulacros");
        }
    }, []);

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <div className="container">
                    <div className="container-fluid">
                        <>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                                    <Grid item xs={12} md={12} >
                                        <Typography component="h2" variant="h3" color="dark" gutterBottom sx={{ textAlign: "center" }}>
                                            Lea las Instrucciones de esta pagina cuidadosamente!
                                        </Typography>
                                        <h1>Instrucciones importantes</h1>
                                        <hr></hr>
                                        <ul>
                                            <li>Tienes que enviar el cuestionario en <b>NN minutos</b></li>
                                            <li>Puede intentar el cuestionario cualquier cantidad de veces</li>
                                            <li>Hay NN puntos por pregunta</li>
                                        </ul>
                                        <hr></hr>
                                        <h1>Intentos de la prueba</h1>
                                        <ul>
                                            <li>Presione el boton <b>Empezar</b> para iniciar el examen</li>
                                            <li>El tiempo comenzará en el momento en que haga click en el botón de inicio</li>
                                            <li>No puede reanudar este cuestionario si se interrumpe por algún motivo</li>
                                            <li>Desplácese hacia abajo para pasar a la siguiente pregunta</li>
                                            <li>Haga clic en el botón enviar cuestionario al finalizar el cuestionario</li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button type='button' onClick={() => { navigate("/UFPSaberPRO/e/simulacros") }} size="large" className="btn btn-danger m-2 flex-start">
                                            Volver
                                        </Button>
                                    </Grid>
                                    <Grid item xs sx={{ display: "flex", justifyContent: "start" }}>
                                        <Button type='submit' onClick={() => { empezarSimulacro() }} size="large" className="btn btn-danger m-2 flex-end">
                                            Empezar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </>
                    </div>
                </div>
            </ResponsiveContainer >
        </React.Fragment >
    );
};

export default InformacionSimulacro;