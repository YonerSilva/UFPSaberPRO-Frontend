import React, { useState, useEffect, useRef } from 'react';
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
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import emailjs from 'emailjs-com';

const ConvocatoriaEstudiantes = () => {
    const frmContact = { convo_nombre: 'FARID', userEmail: 'faridandredo@ufps.edu.co' };
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const { formEdition } = useStore();
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();
    const { ExportCSVButton } = CSVExport;
    const [contact, setContact] = useState(frmContact);
    const [showMessage, setShowMessage] = useState(false);
    const [valida, setValida] = useState(false);

    const columnas = [
        {
            text: "NOMBRE",
            dataField: "usu_nombre",
            align: 'center',
            sort: true,
            csvExport: valida
        },
        {
            text: "APELLIDO",
            dataField: "usu_apellido",
            align: 'center',
            sort: true,
            csvExport: valida

        },
        {
            text: "CODIGO",
            dataField: "usu_codigo",
            align: 'center',
            sort: true,
            csvExport: false

        },
        {
            text: "EMAIL",
            dataField: "usu_email",
            align: 'center',
            sort: true,
            formatter: (cellContent, row) => {
                return <a href={"mailto:" + row.usu_email}>{row.usu_email}</a>
            },
            csvExport: true
        },
        {
            text: "PROGRAMA",
            dataField: "cod_programa",
            align: 'center',
            sort: true,
            csvExport: valida
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

    const Button_Email = (props) => {
        const handleClick = async () => {
            await setValida(false);
            props.onExport();
        };
        return (
            <div>
                <button className="btn btn-danger" onClick={handleClick}>Exportar Emails</button>
            </div>
        );
    };

    const enviarCorreo = () => {
        try {
            emailjs.send('service_pff3k0a', 'template_8jhzupo', contact, 'UKaCo_vnKUiT9wtEP')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setContact(frmContact);
                    setShowMessage(true);
                }, (err) => {
                    console.log('FAILED...', err);
                });
        } catch (error) {
            console.error(error);
        }
    }

    const Button_Usuarios = (props) => {
        const handleClick = async () => {
            await setValida(true);
            props.onExport();
        };
        return (
            <div className="my-2">
                <button className="btn btn-danger" onClick={handleClick}>Exportar Informacion Usuarios</button>
            </div>
        );
    };

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
                                                <ToolkitProvider
                                                    bootstrap4
                                                    keyField='id_usuario'
                                                    data={handleBuscar(formEdition.usuarios)}
                                                    columns={columnas}
                                                    exportCSV={{
                                                        fileName: 'lista_usuarios.csv',
                                                        separator: ',',
                                                        ignoreHeader: false,
                                                        noAutoBOM: true
                                                    }}
                                                >
                                                    {
                                                        props => (
                                                            <React.Fragment>
                                                                <Button_Usuarios {...props.csvProps} />
                                                                <Button_Email {...props.csvProps} />
                                                                <Button onClick={() => { enviarCorreo() }} size="large" className="btn btn-danger m-2">
                                                                    Enviar Correo a Participantes
                                                                </Button>
                                                                <hr />
                                                                <BootstrapTable
                                                                    headerClasses='table-head'
                                                                    classes='table-design shadow'
                                                                    //bootstrap4
                                                                    wrapperClasses='table-responsive'
                                                                    striped
                                                                    hover
                                                                    //keyField='id_usuario'
                                                                    //data={handleBuscar(formEdition.usuarios)}
                                                                    //columns={columnas}
                                                                    pagination={paginationFactory()}
                                                                    noDataIndication='No hay usuarios disponibles.'
                                                                    {...props.baseProps}
                                                                />
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </ToolkitProvider>
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