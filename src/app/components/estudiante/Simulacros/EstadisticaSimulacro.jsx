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

const EstadisticaSimulacro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formEditionSimu } = useStore();
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(true);


    const listarEstadisticas = () => {
        try {
            serviceSimulacro.getEstadisticasSimu(formEditionSimu).then(response => {
                if (response.error === null) {
                    alert_loading(response.message);
                    setEstadisticas();
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
            listarEstadisticas();
        }
    }, []);

    const cantPreguntasBuenas = () => {
        return estadisticas.filter(item => item.puntaje_obtenido > 0).length;
    }

    const cantPreguntasMalas = () => {
        return estadisticas.filter(item => item.puntaje_obtenido == 0).length;
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
                                        Estadisticas del Simulacro
                                    </Typography>
                                    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
                                        <Container maxWidth="xl">
                                            <Grid container spacing={3}>
                                                <Grid xs={12} sm={6} lg={3}>
                                                    <Card difference={12} sx={{ height: '100%' }}>
                                                        <CardContent>
                                                            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                                                                <Stack spacing={1}>
                                                                    <Typography color="text.secondary" variant="overline">{()=>{cantPreguntasBuenas()}}</Typography>
                                                                    <Typography variant="h4">Preguntas Buenas</Typography>
                                                                </Stack>
                                                                <Avatar sx={{ backgroundColor: 'primary.main', height: 56, width: 56 }}>
                                                                    <SvgIcon><CheckCircleIcon /></SvgIcon>
                                                                </Avatar>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid xs={12} sm={6} lg={3}>
                                                    <Card difference={12} sx={{ height: '100%' }}>
                                                        <CardContent>
                                                            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                                                                <Stack spacing={1}>
                                                                    <Typography color="text.secondary" variant="overline">{()=>{cantPreguntasMalas()}}</Typography>
                                                                    <Typography variant="h4">Preguntas Malas</Typography>
                                                                </Stack>
                                                                <Avatar sx={{ backgroundColor: 'primary.main', height: 56, width: 56 }}>
                                                                    <SvgIcon><HighlightOffIcon /></SvgIcon>
                                                                </Avatar>
                                                            </Stack>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
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
};

export default EstadisticaSimulacro;