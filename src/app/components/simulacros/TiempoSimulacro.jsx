import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function TiempoSimulacro() {
     
    return (
        <React.Fragment>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                <TextField
                        id="datetime-local"
                        label="Fecha y Hora de Inicio"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                        id="datetime-local"
                        label="Fecha y Hora de Finalizacion"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}