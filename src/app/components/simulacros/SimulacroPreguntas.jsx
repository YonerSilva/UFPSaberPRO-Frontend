import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Cargador from "../extra/CargadorEventos";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import Paper from "@mui/material/Paper";
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import * as serviceSimulacro from '../../store/services/SimulacroService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alert_error, alert_loading, alert_success } from '../../util/functions';
import NoPreguntas from '../preguntas/NoPreguntas';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card, Form } from 'react-bootstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2';
import { Link } from '@mui/material';

const SimulacroPreguntasList = () => {
     const dispatch = useDispatch();
     const { formEditionSimu, lista_categorias_programa, lista_subcategorias_programa } = useStore();
     const [preguntas, setPreguntas] = useState([]);
     const [formEdition, setFormEdition] = useState({
          simulacro: formEditionSimu.id_simulacro,
          preguntas: [],
     });
     const [loading, setLoading] = useState(true);
     const navigate = useNavigate();
     const [subcategorias, setSubcategorias] = useState([]);
     const [datos, setDatos] = useState({
          categoria: "",
          id_subcategoria: "",
          simu_puntaje_maximo: formEditionSimu.simu_puntaje_maximo
     });
     const [rowsNotEdit, setRowsNotEdit] = useState([]);

     const columnas = [
          {
               text: "DESCRIPCION",
               dataField: "preg_descripcion",
               align: "center",
               sort: true,
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          },
          {
               text: "VALOR (Editable)",
               dataField: "simu_preg_puntaje",
               align: "center",
               editable: (cell, row, rowIndex, colIndex) => {
                    if (rowsNotEdit.filter(item => parseInt(item) === parseInt(rowIndex)).length > 0) {
                         return false;
                    } else {
                         return true;
                    }
               },
               formatter: (cellContent, row) => {
                    if (row.simu_preg_puntaje === null || row.simu_preg_puntaje === undefined) {
                         return 0;
                    } else {
                         return row.simu_preg_puntaje;
                    }
               }
          },
          {
               text: "SUBCATEGORIA",
               dataField: "preg_subcategoria",
               align: "center",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    return row.subcategoria.sub_nombre;
               },
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          },
          {
               text: "IMAGEN",
               dataField: "preg_imagen",
               align: "center",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.preg_imagen !== null && row.preg_imgane !== "") {
                         return <Link href={row.preg_imagen} target="_blank">Imagen</Link>
                    }else{
                         return <span>No disponible.</span>
                    }
               },
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          },
          {
               text: "ESTADO",
               dataField: "preg_estado",
               align: 'center',
               sort: true,
               formatter: (cellContent, row) => {
                    switch (row.preg_estado) {
                         case "A":
                              return <span className='estado-color-activo'>ACTIVO</span>
                         case "I":
                              return <span className='estado-color-inactivo'>INACTIVO</span>
                         case "B":
                              return <span className='estado-color-bloqueado'>BLOQUEADO</span>
                         default:
                              return <></>;
                    }
               },
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          },
          {
               text: "TIPO",
               dataField: "preg_tipo",
               align: 'center',
               formatter: (cellContent, row) => {
                    switch (row.preg_tipo) {
                         case 1:
                              return <span>VERDADERO O FALSO</span>
                         case 2:
                              return <span>SELECCION MULTIPLE</span>
                         default:
                              return <></>;
                    }
               },
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          },
          {
               text: "ACCIÓN",
               dataField: "fd1",
               isDummyField: true,
               formatter: (cellContent, row) => {
                    if (row.preg_estado === 'I') {
                         return (
                              <div className="row-cols-2 row-cols-md-auto" align="center">
                                   <IconButton onClick={() => { updatePregunta(row) }} title='Actualizar Pregunta' style={{ color: "blue" }}><EditIcon /></IconButton>
                                   <IconButton title='Eliminar Pregunta' style={{ color: "red" }}> <DeleteIcon /></IconButton>
                                   <IconButton onClick={() => { verOpciones(row) }} title="Ver Opciones" style={{ color: "gray" }}><VisibilityIcon /></IconButton>
                              </div>
                         )
                    } else {
                         return (
                              <IconButton onClick={() => { verOpciones(row) }} title="Ver Opciones" style={{ color: "gray" }}><VisibilityIcon /></IconButton>
                         )
                    }
               },
               editable: (cell, row, rowIndex, colIndex) => {
                    return false;
               }
          }
     ];

     const handleChange = (e) => {
          const name = e.target.name;
          const value = e.target.value;
          setDatos(prev => ({ ...prev, [name]: value }));
          if (name === "categoria") {
               if (value === "") {
                    setSubcategorias([]);
               } else {
                    if (lista_subcategorias_programa.length !== 0) {
                         const subs = lista_subcategorias_programa.filter(item => parseInt(item.categoria) === parseInt(value));
                         setSubcategorias(subs);
                    }
               }
          }
     };

     const updatePregunta = (item) => {
          dispatch({
               type: "SET_FORM_EDITION",
               payload: item
          });
          navigate('/UFPSaberPRO/a/preguntas/crear_pregunta');
     }

     const listarPreguntas = () => {
          try {
               serviceSimulacro.getPreguntasDiferentes(formEditionSimu.id_simulacro).then(response => {
                    if (response.error === null) {
                         alert_loading(response.message);
                         setPreguntas(response.preguntas);
                    } else {
                         alert_error("¡Error!", response.message);
                    }
                    setLoading(false);
               });
          } catch (error) {
               console.error(error);
          }
     }

     const verOpciones = (item) => {
          dispatch({
               type: "SET_FORM_EDITION_PREG",
               payload: item
          });
          navigate('/UFPSaberPRO/a/pregunta/opciones');
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               if (formEdition.preguntas.length > 0) {
                    serviceSimulacro.guardarPreguntas(formEdition).then(response => {
                         if (response.error === null) {
                              alert_success(response.message, "Se han guardado las preguntas.");
                              let simulacro = {
                                   id_simulacro: formEditionSimu.id_simulacro,
                                   nombre: formEditionSimu.simu_nombre,
                                   descripcion: formEditionSimu.simu_descripcion,
                                   estado: formEditionSimu.simu_estado,
                                   puntaje_maximo: datos.simu_puntaje_maximo,
                                   programa: formEditionSimu.programa,
                              }
                              serviceSimulacro.actualizar(simulacro).then(res => {
                                   listarSimulacros();
                              });
                         } else {
                              alert_error("¡Error!", response.message);
                         }
                    });
               } else {
                    alert_error("¡Error!", "Debe seleccionar al menos una pregunta.");
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
                    navigate("/UFPSaberPRO/a/simulacros/preguntas");
               } else {
                    alert_error("¡Error!", res.message);
               }
          });
     }

     const handleFiltrarPreguntasSub = (data) => {
          if (datos.id_subcategoria === "") {
               return preguntas;
          } else {
               return data.filter((item) =>
                    item.id_subcategoria
                         .toString()
                         .toUpperCase()
                         .includes(datos.id_subcategoria)
               );
          }
     };

     const handleLimpiar = () => {
          let check = document.querySelectorAll('.selection-input-4')[0];
          if (check.checked === true) {
               check.click();
          }
          let array2 = preguntas;
          for (let i = 0; i < array2.length; i++) {
               array2[i].simu_preg_puntaje = 0;
          }
          setRowsNotEdit([]);
          setPreguntas(prev => (array2));
          setDatos(prev => ({ ...prev, categoria: "", id_subcategoria: "", simu_puntaje_maximo: formEditionSimu.simu_puntaje_maximo }));
          setFormEdition(prev => ({ ...prev, preguntas: [] }));
     };

     useEffect(() => {
          if (Object.keys(formEditionSimu).length === 0 || formEditionSimu.id_simulacro === undefined || formEditionSimu.simu_estado !== "I") {
               navigate('/UFPSaberPRO/a/simulacros');
          } else {
               listarPreguntas();
          }

          return () => {
               dispatch({
                    type: "SET_FORM_EDITION",
                    payload: {}
               })
          }
     }, []);

     const selectRow = {
          mode: 'checkbox',
          clickToSelect: false,
          bgColor: "#83E4FE",
          onSelect: (row, isSelect, rowIndex, e) => {
               if (isSelect === true && (row.simu_preg_puntaje <= 0)) {
                    alert_error("¡Error!", "El valor de la pregunta debe ser mayor a 0.");
                    return false;
               }
               if (isSelect) {
                    //setFormEdition(prev => ({ ...prev, preguntas: [...formEdition.preguntas, { id_pregunta: row.id_pregunta, simu_preg_puntaje: parseInt(row.simu_preg_puntaje) }] }));
                    setFormEdition(prev => ({ ...prev, preguntas: [...formEdition.preguntas, row] }));
                    setRowsNotEdit([...rowsNotEdit, parseInt(rowIndex)]);
                    setDatos(prev => ({ ...prev, simu_puntaje_maximo: (datos.simu_puntaje_maximo + parseInt(row.simu_preg_puntaje)) }))
               } else {
                    setFormEdition(prev => ({ ...prev, preguntas: formEdition.preguntas.filter(item => item?.id_pregunta !== row.id_pregunta) }));
                    setRowsNotEdit(rowsNotEdit.filter(item => parseInt(item) !== parseInt(rowIndex)));
                    setDatos(prev => ({ ...prev, simu_puntaje_maximo: (datos.simu_puntaje_maximo - parseInt(row.simu_preg_puntaje)) }))
               }
          },
          onSelectAll: (isSelect, rows, e) => {
               if (isSelect) {
                    Swal.fire({
                         html: "<div class='form-floating'><input type='number' class='form-control' id='valor_preguntas' placeholder='VALOR'/><label for='valor_preguntas'>VALOR DE LAS PREGUNTAS</label></div>",
                         showCancelButton: true,
                         confirmButtonColor: '#bb2d3b',
                         cancelButtonColor: '#bb2d3b',
                         confirmButtonText: 'GUARDAR',
                         cancelButtonText: 'CANCELAR',
                         width: 300
                    }).then((result) => {
                         if (result.isConfirmed) {
                              let valor = document.getElementById("valor_preguntas").value;
                              if (valor === "" || valor === undefined) {
                                   alert_error("¡Error!", "Debe completar el campo del valor de las preguntas.");
                                   return false;
                              }
                              let array1 = [];
                              let array2 = preguntas;
                              let sum = valor * array2.length;
                              for (let i = 0; i < array2.length; i++) {
                                   array1.push(i);
                                   array2[i].simu_preg_puntaje = valor;
                              }
                              setDatos(prev => ({ ...prev, simu_puntaje_maximo: (datos.simu_puntaje_maximo + sum) }))
                              setRowsNotEdit(array1);
                              setPreguntas(array2);
                              setFormEdition(prev => ({ ...prev, preguntas: preguntas }));
                         } else {
                              handleLimpiar();
                         }
                    })
               } else {
                    handleLimpiar();
               }
          }
     };

     return (
          <React.Fragment>
               <ResponsiveContainer>
                    <div className="container">
                         <Typography component="h2" variant="h5" color="dark" gutterBottom>
                              Lista de Preguntas del Simulacro
                         </Typography>

                         <div className="container-fluid">
                              {(() => {
                                   if (!loading) {
                                        if (preguntas.length === 0) {
                                             return <NoPreguntas />;
                                        } else {
                                             return (
                                                  <>
                                                       <Paper
                                                            variant="outlined"
                                                            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                                                       >
                                                            <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                                                                 <Grid item xs={6} className="my-auto">
                                                                      <Grid item xs={6} className="mb-3 mx-auto">
                                                                           <TextField
                                                                                id="categoria"
                                                                                name="categoria"
                                                                                label="Categoria"
                                                                                required
                                                                                select
                                                                                value={datos.categoria}
                                                                                onChange={handleChange}
                                                                                fullWidth
                                                                                variant="outlined"
                                                                           >
                                                                                {lista_categorias_programa.map((categoria) => (
                                                                                     <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                                                                                          {categoria.cate_nombre}
                                                                                     </MenuItem>
                                                                                ))}
                                                                           </TextField>
                                                                      </Grid>
                                                                      {
                                                                           datos.categoria !== ""
                                                                                ?
                                                                                <Grid item xs={6} className="mx-auto">
                                                                                     <TextField
                                                                                          id="subcategoria"
                                                                                          name="id_subcategoria"
                                                                                          label="Subcategorias"
                                                                                          required
                                                                                          select
                                                                                          value={datos.id_subcategoria}
                                                                                          onChange={handleChange}
                                                                                          fullWidth
                                                                                          variant="outlined"
                                                                                     >
                                                                                          {subcategorias.map((subcategoria) => (
                                                                                               <MenuItem key={subcategoria.id_subcategoria} value={subcategoria.id_subcategoria}>
                                                                                                    {subcategoria.sub_nombre}
                                                                                               </MenuItem>
                                                                                          ))}
                                                                                     </TextField>
                                                                                </Grid>
                                                                                :
                                                                                <></>
                                                                      }
                                                                 </Grid>
                                                                 <Grid item xs={6}>
                                                                      <Card border="danger">
                                                                           <Card.Header>SIMULACRO</Card.Header>
                                                                           <Card.Body>
                                                                                <Card.Title>
                                                                                     <b>Nombre: </b>{formEditionSimu.simu_nombre}
                                                                                </Card.Title>
                                                                                <Card.Text>
                                                                                     <b>Puntaje Máximo del Simulacro: </b>{formEditionSimu.simu_puntaje_maximo}
                                                                                     <br />
                                                                                     <b>Sumatoria Valor Preguntas Seleccionadas: </b>{datos.simu_puntaje_maximo - formEditionSimu.simu_puntaje_maximo}
                                                                                     <br />
                                                                                     <b>Puntaje Máximo Futuro del Simulacro: </b>{datos.simu_puntaje_maximo}
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                     <b>Descripción: </b>
                                                                                     <br />
                                                                                     {formEditionSimu.simu_descripcion}
                                                                                </Card.Text>
                                                                           </Card.Body>
                                                                      </Card>
                                                                 </Grid>
                                                            </Grid>
                                                            <Form onSubmit={handleSubmit}>
                                                                 <Grid item xs={12}>
                                                                      <BootstrapTable
                                                                           headerClasses="table-head"
                                                                           classes="table-design shadow"
                                                                           bootstrap4
                                                                           wrapperClasses="table-responsive"
                                                                           striped
                                                                           bordered
                                                                           hover
                                                                           keyField="id_pregunta"
                                                                           data={handleFiltrarPreguntasSub(preguntas)}
                                                                           columns={columnas}
                                                                           pagination={paginationFactory()}
                                                                           noDataIndication="No hay registros disponibles."
                                                                           selectRow={selectRow}
                                                                           cellEdit={cellEditFactory({ mode: 'click' })}
                                                                      />
                                                                 </Grid>

                                                                 <Grid item xs sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                      <Button onClick={() => { navigate("/UFPSaberPRO/a/simulacros/preguntas") }} size="large" className="btn btn-danger m-2">
                                                                           Volver
                                                                      </Button>
                                                                      <Button onClick={() => { handleLimpiar() }} size="large" className="btn btn-danger m-2">
                                                                           Limpiar
                                                                      </Button>
                                                                      <Button type='submit' size='large' className='btn btn-danger m-2'>
                                                                           Guardar
                                                                      </Button>
                                                                 </Grid>
                                                            </Form>
                                                       </Paper>
                                                  </>
                                             );
                                        }
                                   } else {
                                        return <Cargador />;
                                   }
                              })()}
                         </div>
                    </div>
               </ResponsiveContainer>
          </React.Fragment>
     );
};

export default SimulacroPreguntasList;