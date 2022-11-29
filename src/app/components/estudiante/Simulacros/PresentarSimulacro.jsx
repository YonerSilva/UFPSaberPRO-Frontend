import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from 'react-bootstrap';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import { useState } from 'react';

const PresentarSimulacro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [simulacro, setSimulacro] = useState({});

    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <div className="container">
                    <div className="container-fluid">
                        <>
                            <Typography component="h2" variant="h4" color="dark" gutterBottom>
                                En Curso Simulacro (NOMBRE DE SIMULACRO)
                            </Typography>
                            <hr></hr>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },  }}>
                                <Grid container spacing={3} sx={{display: "flex", justifyContent: "center"}}>
                                    <Grid item xs={3} md={6} >
                                        <h1>TITULO PREGUNTA</h1>
                                        <h3>Imagen</h3>
                                        <ul>
                                            <li>OPCION A</li>
                                            <li>OPCION B</li>
                                            <li>OPCION C</li>
                                            <li>OPCION D</li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                                        <Button type='button' onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2 flex-start">
                                            Anterior
                                        </Button>
                                        <Button type='submit' size="large" className="btn btn-danger m-2 flex-end">
                                            Siguiente
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

export default PresentarSimulacro;