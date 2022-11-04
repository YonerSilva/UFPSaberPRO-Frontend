import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Subcategorias from './Subcategorias';

const currencies = [
    {
        value: '115',
        label: 'Generica'
    },
    {
        value: 'b',
        label: 'Especifica'
    },
]


export default function CategoriaSubC() {
    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    }
        return (
            <React.Fragment>
                <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Grid item xs={12} sm={6} m={1}  >
                        <TextField
                            id="address2"
                            name="address2"
                            label="Programa"
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
                    <Grid item xs={12} sm={6}>
                        <Subcategorias/>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

