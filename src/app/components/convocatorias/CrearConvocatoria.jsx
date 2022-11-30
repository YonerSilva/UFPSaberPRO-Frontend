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
import { alert_error, alert_loading, alert_success, parseDateLocal } from '../../util/functions';
import { MenuItem } from '@mui/material';
import Cargador from '../extra/CargadorEventos';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';

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
        estado: "",
        simulacro: "",
        simu_fecha_inicio: "",
        simu_fecha_final: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const convocatoria_aux = convertirDatos();
        try {
            console.log(convocatoria_aux)
            if (update) {
                serviceConvocatoria.actualizar(convocatoria_aux).then(response => {
                    serviceConvocatoria.getDatosGenerales().then(res => {
                        if (response.error === null) {
                            alert_success(response.message, "Se ha actualizado la convocatoria");
                        } else {
                            alert_error("¡Error!", response.message);
                        }
                        listarConvocatorias(res);
                    });
                });
            } else {
                serviceConvocatoria.guardar(convocatoria_aux).then(response => {
                    serviceConvocatoria.getDatosGenerales().then(res => {
                        if (response.error === null) {
                            alert_success(response.message, "Se ha guardado la convocatoria");
                            setTimeout(() => { navigate("/UFPSaberPRO/a/convocatorias") }, 2000);
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

    const listarConvocatorias = (response) => {
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

    const convertirDatos = () => {
        const convo = {
            id_convocatoria: convocatoria.id_convocatoria,
            nombre: convocatoria.nombre,
            descripcion: convocatoria.descripcion,
            fecha_inicio: moment(new Date(convocatoria.fecha_inicio)).format(),
            fecha_final: moment(new Date(convocatoria.fecha_final)).format(),
            estado: convocatoria.estado,
            simulacro: convocatoria.simulacro,
            simu_fecha_inicio: convocatoria.simu_fecha_inicio!==""? moment(new Date(convocatoria.simu_fecha_inicio)).format():"",
            simu_fecha_final: convocatoria.simu_fecha_final!==""? moment(new Date(convocatoria.simu_fecha_final)).format():""
        }
        return convo;
    }

    useEffect(() => {
        // Anything in here is fired on component mount.
        if (Object.keys(formEdition).length !== 0) {
            setUpdate(true);
            setConvocatoria({
                id_convocatoria: formEdition.id_convocatoria,
                nombre: formEdition.convo_nombre,
                descripcion: formEdition.convo_descripcion,
                fecha_inicio: formEdition.convo_fecha_inicial,
                fecha_final: formEdition.convo_fecha_final,
                estado: formEdition.convo_estado,
                simulacro: formEdition.simulacro!==null?formEdition.simulacro: "",
                simu_fecha_inicio: formEdition.simu_fecha_inicial!==null? formEdition.simu_fecha_inicial:"",
                simu_fecha_final: formEdition.simu_fecha_final!==null? formEdition.simu_fecha_final: ""
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

    function validarFechasConvocatoria() {
        try {
            const fecha_inicio = moment(new Date(convocatoria.fecha_inicio)).format();
            const fecha_final = moment(new Date(convocatoria.fecha_final)).format();
            const simulacro = convocatoria.simulacro;
            if (fecha_inicio === "" || fecha_final === "") {
                throw new Error("Los campos no pueden estar vacios.");
            } else {
                if(fecha_inicio > fecha_final){
                    throw new Error("La fecha inicial de la convocatoria debe ser menor a la fecha final de la convocatoria.");
                }else{
                    let button = document.getElementById("button_register");
                        if (simulacro !== "") {
                            validarFechasSimulacro();
                        } else {
                            button.setAttribute('type', 'submit');
                        }
                }
            }
        } catch (error) {
            alert_error("¡Error!", error);
        }
    }

    function validarFechasSimulacro() {
        try {
            const simu_fecha_inicio = moment(new Date(convocatoria.simu_fecha_inicio)).format();
            const simu_fecha_final = moment(new Date(convocatoria.simu_fecha_final)).format();
            const convo_fecha_final = moment(new Date(convocatoria.fecha_final)).format();

            if (simu_fecha_inicio === "" || convo_fecha_final === "" || simu_fecha_final === "") {
                throw new Error("Los campos no pueden estar vacios.");
            } else {

                if(convo_fecha_final > simu_fecha_final){
                    throw new Error("La fecha inicial del simulacro debe ser mayor a la fecha final de la convocatoria.");
                }else{
                    if(simu_fecha_inicio > simu_fecha_final){
                        throw new Error("La fecha final del simulacro debe ser mayor a la fecha inicial del simulacro.");
                    }else{
                        let button = document.getElementById("button_register");
                        button.setAttribute('type', 'submit');
                    }
                }
            }
        } catch (error) {
            alert_error("¡Error!", error);
        }
    }

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
                                                    inputProps={{
                                                        maxLength: 100
                                                    }}
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
                                                    inputProps={{
                                                        maxLength: 256
                                                    }}
                                                    value={convocatoria.descripcion}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <Stack spacing={3}>
                                                        <DateTimePicker
                                                            label="Fecha y Hora de Inicio"
                                                            value={dayjs(convocatoria.fecha_inicio)}
                                                            inputFormat="YYYY-MM-DD HH:mm"
                                                            ampm={false}
                                                            ampmInClock={false}
                                                            onChange={(value) => { setConvocatoria({ ...convocatoria, fecha_inicio: value }) }}
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    inputProps={{
                                                                        id: "fecha_inicio",
                                                                        "aria-required": true,
                                                                    }}
                                                                    {...params} />}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <Stack spacing={3}>
                                                        <DateTimePicker
                                                            label="Fecha y Hora Final"
                                                            value={dayjs(convocatoria.fecha_final)}
                                                            inputFormat="YYYY-MM-DD HH:mm"
                                                            ampm={false}
                                                            ampmInClock={false}
                                                            onChange={(value) => { setConvocatoria({ ...convocatoria, fecha_final: value }) }}
                                                            renderInput={(params) =>
                                                                <TextField
                                                                    inputProps={{
                                                                        id: "fecha_final",
                                                                        "aria-required": true,
                                                                    }}
                                                                    {...params} />}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="simulacro"
                                                    label="Seleccione Simulacro"
                                                    select
                                                    value={convocatoria.simulacro}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    inputProps={{
                                                        defaultValue: "",
                                                        id: "simulacro"
                                                    }}
                                                    autoComplete="shipping address-line2"
                                                    variant="outlined">
                                                    {lista_simulacros_programa?.map((simulacro) => (
                                                        <MenuItem key={simulacro.id_simulacro} value={simulacro.id_simulacro}>
                                                            {simulacro.simu_nombre}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            {
                                                convocatoria.simulacro
                                                    ?
                                                    <>
                                                        <Grid item xs={6}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <Stack spacing={3}>
                                                                    <DateTimePicker
                                                                        label="Fecha y Hora de Inicio del Simulacro"
                                                                        value={dayjs(convocatoria.simu_fecha_inicio)}
                                                                        inputFormat="YYYY-MM-DD HH:mm"
                                                                        ampm={false}
                                                                        ampmInClock={false}
                                                                        onChange={(value) => { setConvocatoria({ ...convocatoria, simu_fecha_inicio: value }) }}
                                                                        renderInput={(params) =>
                                                                            <TextField
                                                                                inputProps={{
                                                                                    id: "simu_fecha_inicio",
                                                                                    "aria-required": true,
                                                                                }}
                                                                                {...params} />}
                                                                    />
                                                                </Stack>
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <Stack spacing={3}>
                                                                    <DateTimePicker
                                                                        label="Fecha y Hora Final del Simulacro"
                                                                        value={dayjs(convocatoria.simu_fecha_final)}
                                                                        inputFormat="YYYY-MM-DD HH:mm"
                                                                        ampm={false}
                                                                        ampmInClock={false}
                                                                        onChange={(value) => { setConvocatoria({ ...convocatoria, simu_fecha_final: value }) }}
                                                                        renderInput={(params) =>
                                                                            <TextField
                                                                                inputProps={{
                                                                                    id: "simu_fecha_final",
                                                                                    "aria-required": true,
                                                                                }}
                                                                                {...params} />}
                                                                    />
                                                                </Stack>
                                                            </LocalizationProvider>
                                                        </Grid>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button type='button' onClick={() => { navigate(-1) }} size='medium' className='btn btn-danger m-2'>
                                                    Volver
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <Button id="button_register" onClick={() => { validarFechasConvocatoria() }} type='button' size='medium' className='btn btn-danger m-2'>
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
