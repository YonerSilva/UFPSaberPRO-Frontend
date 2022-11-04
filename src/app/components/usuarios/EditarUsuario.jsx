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

const currencies = [
    {
        value: '1',
        label: 'Administrador'
    },
    {
        value: '2',
        label: 'Docente'
    },
    {
        value: '3',
        label: 'Estudiante'
    },
]

const theme = createTheme();

export default function EditarUsuario() {

    const [currency, setCurrency] = React.useState('');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    }
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" p={2}>
                        Editar Usuario
                    </Typography>
                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12}>
                            <TextField
                                required
                                id="codigo"
                                name="codigo"
                                label="1151778"
                                multiline
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                maxlength="100"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="nombre"
                                name="nombre"
                                label="Farid"
                                multiline
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                maxlength="100"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="apellido"
                                name="apellido"
                                label="Andre"
                                multiline
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                maxlength="100"

                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="descripcion"
                                name="Email"
                                label="faridandredo@ufps.edu.co"
                                fullWidth
                                multiline
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                maxlength="256"

                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="address2"
                                name="address2"
                                label="Administrador"
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
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button size='medium' className='btn btn-danger m-2'>
                                Volver
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button size='medium' className='btn btn-danger m-2'>
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
