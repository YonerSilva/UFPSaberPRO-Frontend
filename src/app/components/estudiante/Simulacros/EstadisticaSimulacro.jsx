import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import { Button } from 'react-bootstrap';
import { useDispatch, useStore } from '../../../store/Provider/storeProvider';
import * as serviceSimulacro from '../../../store/services/SimulacroService';
import { alert_error, alert_loading } from '../../../util/functions';
import Cargador from '../../extra/CargadorEventos';
import Container from '@mui/material/Container';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar, Card, CardContent, Stack, SvgIcon } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const EstadisticaSimulacro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formEditionSimu } = useStore();
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);


    const listarResultado = () => {
        try {
            serviceSimulacro.getEstadisticasSimu(formEditionSimu).then(response => {
                if (response.error === null) {
                    alert_loading(response.message);
                    setResultado(response.resultado);
                } else {
                    alert_error("¡Error!", response.message);
                }
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (Object.keys(formEditionSimu).length === 0 && formEditionSimu.id_simulacro === undefined) {
            navigate("/UFPSaberPRO/e/simulacros");
        } else {
            listarResultado();
        }
    }, []);

    const cantPreguntasBuenas = () => {
        return resultado.estadisticas.filter(item => item.puntaje_obtenido > 0);
    }

    const cantPreguntasMalas = () => {
        return resultado.estadisticas.filter(item => item.puntaje_obtenido == 0);
    }

    const estadisticas_diagrama = () => {

        let data = [
            {
                nombre: 'Preguntas Buenas',
                cantidad: cantPreguntasBuenas().length
            },
            {
                nombre: 'Preguntas Malas',
                cantidad: cantPreguntasMalas().length
            }
        ]
        return data;
    }

    return (
        <React.Fragment>
            <Container component="main" sx={{ mb: 4 }}>
                {
                    (() => {
                        if (!loading) {
                            return (
                                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <Typography component="h1" variant="h4" align="center" p={2}>
                                        Estadisticas del Simulacro ({formEditionSimu.simu_nombre})
                                    </Typography>
                                    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
                                        <Container maxWidth="xl">
                                            <Grid container spacing={3}>
                                                <Grid xs={12} sm={6} lg={3}>
                                                    <Card difference={12} sx={{ height: '100%' }}>
                                                        <CardContent>
                                                            <Stack alignItems="center" direction="row" justifyContent="space-between" alignContent="center" spacing={3}>
                                                                <Stack spacing={1}>
                                                                    <Typography variant="h6">Preguntas Buenas</Typography>
                                                                    <Typography color="text.secondary" variant="h2">{cantPreguntasBuenas().length}</Typography>
                                                                </Stack>
                                                                <Avatar sx={{ backgroundColor: 'green', height: 56, width: 56 }}>
                                                                    <SvgIcon><CheckCircleIcon /></SvgIcon>
                                                                </Avatar>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid xs={12} sm={6} lg={3}>
                                                    <Card difference={12} sx={{ height: '100%' }}>
                                                        <CardContent>
                                                            <Stack alignItems="center" direction="row" justifyContent="space-between" alignContent="center" spacing={3}>
                                                                <Stack spacing={1}>
                                                                    <Typography variant="h6">Preguntas Malas</Typography>
                                                                    <Typography color="text.secondary" variant="h2">{cantPreguntasMalas().length}</Typography>
                                                                </Stack>
                                                                <Avatar sx={{ backgroundColor: 'red', height: 56, width: 56 }}>
                                                                    <SvgIcon><HighlightOffIcon /></SvgIcon>
                                                                </Avatar>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                                                <BarChart
                                                    width={600}
                                                    height={300}
                                                    data={estadisticas_diagrama()}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="nombre" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="cantidad" fill="#8884d8" />
                                                </BarChart>
                                            </div>
                                        </Container>
                                    </Box>
                                </Paper>
                            )
                        } else {
                            return (<Cargador />)
                        }
                    })()
                }
            </Container>
        </React.Fragment>
    );
}

export default EstadisticaSimulacro;