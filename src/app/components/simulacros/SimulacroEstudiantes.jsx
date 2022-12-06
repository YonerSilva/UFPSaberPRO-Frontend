import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import BootstrapTable from 'react-bootstrap-table-next';
import Cargador from '../extra/CargadorEventos';
import Barra from '../extra/BarraBusqueda';
import NoEstudiante from '../simulacros/NoEstudiantes';
import { useStore } from '../../store/Provider/storeProvider';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as serviceSimulacro from '../../store/services/SimulacroService';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { alert_error, alert_loading } from '../../util/functions';
import { useNavigate } from 'react-router-dom';

const SimulacroEstudiantes = () => {
    const { formEditionSimu } = useStore();
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState([]);
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
            sort: true,

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
            },

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
            return usuarios;
        } else {
            return data.filter(
                (item) =>
                    item.usu_nombre.toString().toUpperCase().includes(busqueda.toUpperCase())
            );
        }
    }

    const listarSimulacroEstudiantes = () => {
        try {
            serviceSimulacro.getEstudiantesSimu(formEditionSimu.id_simulacro).then(response => {
                if (response.error === null) {
                    alert_loading(response.message);
                    setUsuarios(response.usuarios);
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
        if(Object.keys(formEditionSimu).length===0 && formEditionSimu.id_simulacro===undefined){
            navigate("/UFPSaberPRO/a/simulacros");
        }else{
            listarSimulacroEstudiantes();
        }
    }, []);

    const Button_Usuarios = (props) => {
        const handleClick = async () => {
            props.onExport();
        };
        return (
            <div className="my-2">
                <button className="btn btn-danger" onClick={handleClick}>Exportar Informacion de Estudiantes</button>
            </div>
        );
    };

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <div className="container">
                    <Typography component="h2" variant="h5" color="dark" gutterBottom>
                        Lista de Usuarios inscritos en el Simulacro
                    </Typography>
                    {
                        (() => {
                            if (usuarios.length !== 0) {
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
                                    if (usuarios.length === 0) {
                                        return (
                                            <NoEstudiante />
                                        )
                                    } else {
                                        return (
                                            <>
                                                <ToolkitProvider
                                                    bootstrap4
                                                    keyField='id_usuario'
                                                    data={handleBuscar(usuarios)}
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
                                                                <hr />
                                                                <BootstrapTable
                                                                    headerClasses='table-head'
                                                                    classes='table-design shadow'
                                                                    wrapperClasses='table-responsive'
                                                                    striped
                                                                    hover
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

export default SimulacroEstudiantes;