import React, { useState, useEffect } from 'react';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import BootstrapTable from 'react-bootstrap-table-next';
import Grid from "@mui/material/Grid";
import { Button, Card, Form } from 'react-bootstrap';
import Cargador from '../extra/CargadorEventos';
import Barra from '../extra/BarraBusqueda';
import NoUser from '../convocatorias/NoConvocatoria';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as serviceConvocatoria from '../../store/services/ConvocatoriaService';
import * as serviceSimulacro from '../../store/services/SimulacroService';

const ConvocatoriaEstudiantes = () => {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const { formEdition } = useStore();
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    const columnas = [
        {
            text: "NOMBRE",
            dataField: "usu_nombre",
            align: 'center',
            sort: true,
        },
        {
            text: "APELLIDO",
            dataField: "usu_apellido",
            align: 'center',
            sort: true
        },
        {
            text: "CODIGO",
            dataField: "usu_codigo",
            align: 'center',
            sort: true,
        },
        {
            text: "EMAIL",
            dataField: "usu_email",
            align: 'center',
            sort: true,
            formatter: (cellContent, row) => {
                return <a href={"mailto:" + row.usu_email}>{row.usu_email}</a>
            }
        },
        {
            text: "PROGRAMA",
            dataField: "cod_programa",
            align: 'center',
            sort: true,
        }
    ]

    const handleBuscar = (data) => {
        if (busqueda === "") {
            return formEdition.usuarios;
        } else {
            return data.filter(
                (item) =>
                    item.usu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
            );
        }
    }


    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <React.Fragment>
            <ResponsiveContainer>
                <div className="container">
                    <Typography component="h2" variant="h5" color="dark" gutterBottom>
                        Lista de Usuarios inscritos en la Convocatoria
                    </Typography>
                    {
                        (() => {
                            if (formEdition.usuarios.length !== 0) {
                                return (
                                    <Barra
                                        input={<input onChange={(e) => { setBusqueda(e.target.value) }} title='Nombre Usuario' placeholder="Buscar Usuario" className="form-control me-2 border border-danger shadow" type="search" aria-label="Buscar" />}
                                    />
                                )
                            }
                        })()
                    }
                    <hr />
                    <div className="container-fluid">
                        {
                            (() => {
                                if (!loading) {
                                    if (formEdition.usuarios.length === 0) {
                                        return (
                                            <NoUser />
                                        )
                                    } else {
                                        return (
                                            <>
                                                <BootstrapTable headerClasses='table-head'
                                                    classes='table-design shadow'
                                                    bootstrap4
                                                    wrapperClasses='table-responsive'
                                                    striped
                                                    hover
                                                    keyField='id_usuario'
                                                    data={handleBuscar(formEdition.usuarios)}
                                                    columns={columnas}
                                                    pagination={paginationFactory()}
                                                    noDataIndication='No hay usuarios disponibles.' />

                                                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Grid item xs={12} sx={{display: "flex",  justifyContent: "center" }}>
                                                        <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                                                            Volver
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={4} sm={6} sx={{display: "flex", justifyContent: 'flex-end' }}>
                                                        <Button type='submit' size='large' className='btn btn-danger m-2'>
                                                            Imprimir Informacion de los Estudiantes
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={4} sm={6} sx={{display: "flex", justifyContent: 'flex-start' }}>
                                                        <Button type='submit' size='large' className='btn btn-danger m-2'>
                                                            Imprimir Correos de los Estudiantes
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )
                                    }
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

export default ConvocatoriaEstudiantes;