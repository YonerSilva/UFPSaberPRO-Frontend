import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";

const currencies = [
    {
        value: 'PA',
        label: 'Pregunta Abierta'
    },
    {
        value: 'PC',
        label: 'Pregunta Cerrrada'
    },
]

export default function NumPre() {
    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    }
     
    return (
        <React.Fragment>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ mt: 5, mb: 5 }}
                        required
                        id="cardName"
                        label="Cantidad de Preguntas"
                        multiline
                        fullWidth
                        autoComplete="cc-name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ mt: 5, mb: 5 }}
                        id="address2"
                        name="address2"
                        label="Tipo de Preguntas"
                        required
                        select
                        value={currency}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined">
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}