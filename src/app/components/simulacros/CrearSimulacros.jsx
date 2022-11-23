import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import * as serviceSimulacro from '../../store/services/SimulacroService';
import { useEffect ,useState } from "react";
import { alert_error, alert_loading, alert_success } from '../../util/functions';
import { useDispatch, useStore } from "../../store/Provider/storeProvider";
import Cargador from "../extra/CargadorEventos";
import { Form } from "react-bootstrap";

const theme = createTheme();

export default function CrearSimulacros() {
    const navigate = useNavigate();
    const { formEditionSimu } = useStore();
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [simulacro, setSimulacro] = useState({
        id_simulacro: "",
        nombre: "",
        descripcion: "",
        estado: "",
        puntaje_maximo: 0,
        programa: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (update) {
                serviceSimulacro.actualizar(simulacro).then(response => {
                    if (response.error === null) {
                        alert_success(response.message, "Se ha actualizado el simulacro");
                        listarSimulacros();
                    } else {
                        alert_error("¡Error!", response.message);
                    }
                });
            } else {
                serviceSimulacro.guardar(simulacro).then(response => {
                    if (response.error === null) {
                        alert_success(response.message, "Se ha guardado el simulacro.");
                        listarSimulacros();
                    } else {
                        alert_error("¡Error!", response.message);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const listarSimulacros = () => {
        serviceSimulacro.getDatosGenerales().then(res => {
            if (res.error === null) {
                dispatch({
                    type: "SET_LISTA_SIMULACROS_PRG",
                    payload: res.general
                });
                alert_loading(res.message);
                setTimeout(() => { navigate("/UFPSaberPRO/a/simulacros") }, 2000);
            } else {
                alert_error("¡Error!", res.message);
            }
        });
    }

    const handleChange = (e) => {
        setSimulacro({ ...simulacro, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (Object.keys(formEditionSimu).length !== 0) {
            setUpdate(true);
            setSimulacro({
                id_simulacro: formEditionSimu.id_simulacro,
                nombre: formEditionSimu.simu_nombre,
                descripcion: formEditionSimu.simu_descripcion,
                estado: formEditionSimu.simu_estado,
                puntaje_maximo: formEditionSimu.simu_puntaje_maximo,
                programa: formEditionSimu.programa,
            });
        }
        setLoading(false);
        return () => {
            dispatch({
                type: "SET_FORM_EDITION_SIMU",
                payload: {}
            })
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
                                                ? "Actualizar el Simulacro"
                                                : "Crear el Simulacro"
                                        }
                                    </Typography>
                                    <Form onSubmit={handleSubmit}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    sx={{ mt: 5 }}
                                                    required
                                                    id="nombre"
                                                    name="nombre"
                                                    label="Nombre"
                                                    value={simulacro.nombre}
                                                    onChange={handleChange}
                                                    multiline
                                                    fullWidth
                                                    maxLength="100"
                                                    autoComplete="cc-name"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    id="descripcion"
                                                    name="descripcion"
                                                    label="Descripicion"
                                                    value={simulacro.descripcion}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    fullWidth
                                                    multiline
                                                    autoComplete="shipping postal-code"
                                                    variant="outlined"
                                                    maxLength="256"
                                                />
                                            </Grid>
                                            <Grid item xs sx={{ display: "flex", justifyContent: "end" }}>
                                                <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                                                    Volver
                                                </Button>
                                            </Grid>
                                            <Grid item xs sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                <Button type='submit' size='large' className='btn btn-danger m-2'>
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