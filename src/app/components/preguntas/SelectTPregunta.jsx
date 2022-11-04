import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import { Button } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const currencies = [
    {
        value: 'a',
        label: 'Seleccion Multiple'
    },
    {
        value: 'b',
        label: 'Verdadero o falso'
    },
    {
        value: 'c',
        label: 'Abierta'
    }
]

const theme = createTheme();

export default function SeleccionarTPregunta() {

    const [currency, setCurrency] = React.useState('');
    const navigate = useNavigate();   

    const handleChange = (event) => {
        setCurrency(event.target.value);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" p={2}>
                        Seleccione el tipo de Pregunta
                    </Typography>
                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12}>
                            <TextField
                                id="tipo-pregunta"
                                name="tipo-pregunta"
                                label="Tipo de Pregunta"
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
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => { navigate('/UFPSaberPRO/preguntas/crear_Abierta') }} size='medium' className='btn btn-danger m-2'>
                                Continuar
                            </Button>
                            <Button size='medium' className='btn btn-danger m-2'>
                                Volver
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
