import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { Button, Form } from 'react-bootstrap';
import Grid from "@mui/material/Grid";
import Cargador from '../extra/CargadorEventos';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import emailjs from 'emailjs-com';
import { alert_error, alert_success } from '../../util/functions';
import toast from 'react-hot-toast';

const EnviarInvitaciones = () => {
    const { formEdition } = useStore();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    var emails = [];

    const subirArchivo = () => {
        try {
            let file = document.getElementById("formFile").files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                emails = String(reader.result).split(",");
                enviarCorreo();
            };

            reader.onerror = function () {
                alert_error("¡Error!", "Ocurrió un problema al leer el archivo, intente nuevamente.");
            };
        } catch (error) {
            console.error(error);
        }
    }

    const enviarCorreo = () => {
        try {
            toast.promise(new Promise((resolve, reject) => {
                let datos = {
                    convo_nombre: formEdition.convo_nombre,
                    convo_descripcion: formEdition.convo_descripcion,
                    convo_fecha_inicial: formEdition.convo_fecha_inicial,
                    convo_fecha_final: formEdition.convo_fecha_final,
                    simu_fecha_inicial: formEdition.simu_fecha_inicial,
                    simu_fecha_final: formEdition.simu_fecha_final,
                    email: ""
                }
                emails.forEach(email => {
                    datos.email = email;
                    emailjs.send('service_pff3k0a', 'template_8jhzupo', datos, 'UKaCo_vnKUiT9wtEP').then((response) => {
                        resolve();
                        navigate("/UFPSaberPRO/a/convocatorias");
                    }, (err) => {
                        console.error('¡Error!', err);
                        reject();
                    });
                });
            }), {
                loading: "Cargando...",
                error: "¡Error! \n" + "Ha ocurrido un imprevisto al enviar las invitaciones.",
                success: "¡Proceso Exitoso!",
            });

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (Object.keys(formEdition).length === 0 && formEdition.id_convocatoria === undefined) {
            navigate("/UFPSaberPRO/a/convocatorias");
        }
        setLoading(false);
    }, []);

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <div className="container">
                    <Typography component="h2" variant="h3" color="dark" gutterBottom>
                        Enviar Invitaciones
                    </Typography>
                    <div className="container-fluid">
                        {
                            (() => {
                                if (!loading) {
                                    return (
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label style={{ fontWeight: 1000, fontSize: 25 }}>SUBE EL ARCHIVO CON LA INFORMACION⬇️ </Form.Label>
                                            <Form.Control type="file" accept=".csv, .xls, .xlt, .xla" />
                                            <Typography component="h6" variant="caption" color="dark" gutterBottom>
                                                Solo puedes subir archivos .csv separados por (,) coma
                                            </Typography>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
                                                    <Button onClick={() => { subirArchivo() }} size="large" className="btn btn-danger m-2">
                                                        Cargar
                                                    </Button>
                                                    <Button onClick={() => { navigate("/UFPSaberPRO/a/convocatorias") }} size="large" className="btn btn-danger m-2">
                                                        Volver
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form.Group>
                                    )
                                } else {
                                    return (<Cargador />)
                                }
                            })()
                        }
                    </div>
                </div>
            </ResponsiveContainer >
        </React.Fragment >
    );
};

export default EnviarInvitaciones;