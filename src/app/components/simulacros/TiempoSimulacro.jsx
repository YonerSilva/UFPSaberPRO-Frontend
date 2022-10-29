import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";

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