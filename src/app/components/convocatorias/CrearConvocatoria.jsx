import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import * as serviceConvocatoria from '../../store/services/ConvocatoriaService';
import { alert_error, alert_loading, alert_success } from '../../util/functions';
import { MenuItem } from '@mui/material';
import Cargador from '../extra/CargadorEventos';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';

const theme = createTheme();

export default function CrearConvocatoria() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formEdition, lista_simulacros_programa } = useStore();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    const [convocatoria, setConvocatoria] = useState({
        id_convocatoria: "",
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_final: "",
        simulacro: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (update) {
                serviceConvocatoria.actualizar(convocatoria).then(response => {
                    serviceConvocatoria.getDatosGenerales().then(res=>{
                        if (response.error === null) {
                            alert_success(response.message, "Se ha actualizado la convocatoria");
                        } else {
                            alert_error("¡Error!", response.message);
                        }
                        listarConvocatorias(res);
                    });
                });
            } else {
                serviceConvocatoria.guardar(convocatoria).then(response => {
                    serviceConvocatoria.getDatosGenerales().then(res=>{
                        if (response.error === null) {
                            alert_success(response.message, "Se ha guardado la convocatoria");
                        } else {
                            alert_error("¡Error!", response.message);
                        }
                        listarConvocatorias(res);
                    });
                    
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const listarConvocatorias = (response)=>{
        if (response.error === null) {
            dispatch({
                type: "SET_LISTA_CONVOCATORIAS_PRG",
                payload: response.general
            });
            alert_loading(response.message);
        } else {
            alert_error("¡Error!", response.message);
        }
    }

    const handleChange = (e) => {
        setConvocatoria({ ...convocatoria, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        // Anything in here is fired on component mount.
        if (Object.keys(formEdition).length!==0) {
            setUpdate(true);
            setConvocatoria({
                id_convocatoria: formEdition.id_convocatoria,
                nombre: formEdition.convo_nombre,
                descripcion: formEdition.convo_descripcion,
                fecha_inicio: formEdition.convo_fecha_inicial,
                fecha_final: formEdition.convo_fecha_final,
                simulacro: formEdition?.simulacro
            });
        }
        setLoading(false);
        return () => {
            // Anything in here is fired on component unmount.
            dispatch({
                type: "SET_FORM_EDITION",
                payload: {}
            });
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                {
                    (() => {
                        if (!loading) {
                            return (
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <Typography component="h1" variant="h4" align="center" p={2}>
                                        {
                                            update
                                                ? "Actualizar la Convocatoria"
                                                : "Crear la Convocatoria"
                                        }
                                    </Typography>
                                    <Form onSubmit={handleSubmit}>
                                        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    id="nombre"
                                                    name="nombre"
                                                    label="Nombre"
                                                    multiline
                                                    fullWidth
                                                    autoComplete="given-name"
                                                    variant="outlined"
                                                    maxLength="100"
                                                    value={convocatoria.nombre}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    required
                                                    id="descripcion"
                                                    name="descripcion"
                                                    label="Descripicion"
                                                    rows={5}
                                                    fullWidth
                                                    multiline
                                                    autoComplete="shipping postal-code"
                                                    variant="outlined"
                                                    maxLength="256"
                                                    value={convocatoria.descripcion}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    id="fecha_inicio"
                                                    name="fecha_inicio"
                                                    label="Fecha y Hora de Inicio"
                                                    type="datetime-local"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={convocatoria.fecha_inicio}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="fecha_final"
                                                    name="fecha_final"
                                                    label="Fecha y Hora de Finalizacion"
                                                    type="datetime-local"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={convocatoria.fecha_final}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="simulacro"
                                                    name="simulacro"
                                                    label="Seleccione Simulacro"
                                                    select
                                                    value={convocatoria.simulacro}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    autoComplete="shipping address-line2"
                                                    variant="outlined">
                                                    {lista_simulacros_programa?.map((simulacro) => (
                                                        <MenuItem key={simulacro.id_simulacro} value={simulacro.id_simulacro}>
                                                            {simulacro.simu_nombre}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button type='button' onClick={() => { navigate(-1) }} size='medium' className='btn btn-danger m-2'>
                                                    Volver
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <Button type='submit' size='medium' className='btn btn-danger m-2'>
                                                    {
                                                        update
                                                            ? "Actualizar"
                                                            : "Crear"
                                                    }
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Paper>
                            )
                        } else {
                            return (<Cargador />)
                        }
                    })()
                }
            </Container>
        </ThemeProvider>
    );
}
