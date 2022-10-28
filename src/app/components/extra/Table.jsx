import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { styled, TableHead } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import * as service from '../../store/services/UsuarioService';
import { alert_error, alert_success } from '../../util/functions';



const TableDesign = ({ datos, columnsIgnore, columnCount, columnOption }) => {
     const navigate = useNavigate();
     const [page, setPage] = React.useState(0);
     const [rowsPerPage, setRowsPerPage] = React.useState(3);

     // Avoid a layout jump when reaching the last page with empty rows.
     const emptyRows =
          page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datos.length) : 0;

     const handleChangePage = (event, newPage) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const StyledTableCell = styled(TableCell)(({ theme }) => ({
          [`&.${tableCellClasses.head}`]: {
               backgroundColor: "green",
               color: theme.palette.common.white,
          },
          [`&.${tableCellClasses.body}`]: {
               fontSize: 10,
          },
     }));

     function columnas() {
          let array = [];
          for (const [key, value] of Object.entries(datos[0])) {
               if (!columnsIgnore.includes(`${key}`)) {
                    array.push(`${key}`);
               }
          }
          return array;
     }

     function crearColumnas() {
          let array = [];
          let words = [];
          let cadena = "";
          for (const [key, value] of Object.entries(datos[0])) {
               words = `${key}`.split("_");
               for (let i = 0; i < words.length; i++) {
                    cadena += words[i] + " ";
               }
               if (!columnsIgnore.includes(`${key}`)) {
                    array.push(cadena);
               }
               cadena = "";
          }
          return array;
     }

     return (
          <div>
               {
                    (() => {
                         if (datos.length > 0) {
                              return (
                                   <TableContainer component={Paper} className="shadow">
                                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                             <TableHead>
                                                  <TableRow>
                                                       {
                                                            (() => {
                                                                 if (columnCount) {
                                                                      return (
                                                                           <StyledTableCell key={0} align='center' className='fw-bold'>#</StyledTableCell>
                                                                      )
                                                                 }
                                                            })()
                                                       }

                                                       {(() => {
                                                            return (
                                                                 crearColumnas().map((columna, index) => (
                                                                      <StyledTableCell key={index + 1} align='center'>{columna.toString().toUpperCase()}</StyledTableCell>
                                                                 ))
                                                            )
                                                       })()}

                                                       {
                                                            (() => {
                                                                 if (columnOption) {
                                                                      return (
                                                                           <StyledTableCell key={"opcion"} align='center'>OPCIONES</StyledTableCell>
                                                                      )
                                                                 }
                                                            })()
                                                       }

                                                  </TableRow>
                                             </TableHead>
                                             <TableBody>
                                                  {(rowsPerPage > 0
                                                       ? datos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                       : datos
                                                  ).map((dato, index) => (
                                                       <TableRow key={index}>
                                                            {
                                                                 (() => {
                                                                      if (columnCount) {
                                                                           return (
                                                                                <TableCell key={0} className='fw-bold' component="th" scope="row" style={{ width: "20px" }} align='center'>
                                                                                     {index+1}
                                                                                </TableCell>
                                                                           )
                                                                      }
                                                                 })()
                                                            }
                                                            {
                                                                 columnas().map((columna, i) => (
                                                                      <TableCell key={i + 1} align='center'>
                                                                           {dato[columna]}
                                                                      </TableCell>
                                                                 ))
                                                            }
                                                       </TableRow>
                                                  ))}

                                                  {emptyRows > 0 && (
                                                       <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                       </TableRow>
                                                  )}
                                             </TableBody>
                                             <TableFooter>
                                                  <TableRow>
                                                       <TablePagination
                                                            rowsPerPageOptions={[3, 10, 25, { label: 'Todas', value: -1 }]}
                                                            colSpan={3}
                                                            count={datos.length}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            SelectProps={{
                                                                 "aria-label": "filas",
                                                                 inputProps: {
                                                                      'aria-label': 'Filas por Pagina',
                                                                 },
                                                                 native: true,
                                                            }}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                            ActionsComponent={TablePaginationActions}
                                                       />
                                                  </TableRow>
                                             </TableFooter>
                                        </Table>
                                   </TableContainer>
                              )
                         } else {
                              return (
                                   <div className='text-center'>
                                        <h6>No se encontró nada.</h6>
                                   </div>
                              )
                         }
                    })()
               }
          </div>
     );
}

export default TableDesign;