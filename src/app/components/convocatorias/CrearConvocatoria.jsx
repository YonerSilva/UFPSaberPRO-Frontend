import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";
import { Button } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const currencies = [
    {
        value: '115',
        label: 'Ingenieria de Sistemas'
    },
    {
        value: 'b',
        label: 'Ingenieria Civil'
    },
    {
        value: 'c',
        label: 'Ingenieria Industrial'
    },
]

const theme = createTheme();

export default function CrearConvocatoria() {

    const [convocatoria, setConvocatoria] = React.useState({
        nombre: "",
        descripcion: "",
        fecha_inicial: "",
        fecha_final: ""
    });

    const handleChange = (e) => {
        setConvocatoria({...convocatoria, [e.target.name]:e.target.value});
    }

    return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" p={2}>
            Crear la Convocatoria
          </Typography>
            <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        multiline
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        maxlength="100"
                        value={convocatoria.nombre}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        required
                        id="descripcion"
                        name="descripcion"
                        label="Descripicion"
                        rows={5}
                        fullWidth
                        multiline
                        autoComplete="shipping postal-code"
                        variant="outlined"
                        maxlength="256"
                        value={convocatoria.descripcion}
                    />
                </Grid> 
                <Grid item xs={12}>
                    <TextField
                         required
                        id="fecha_inicio"
                        name="fecha_inicio"
                        label="Fecha y Hora de Inicio"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={convocatoria.fecha_inicial}
                        
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="fecha_final"
                        name="fecha_final"
                        label="Fecha y Hora de Finalizacion"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={convocatoria.fecha_final}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size='medium' className='btn btn-danger m-2'>
                    Volver
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button size='medium' className='btn btn-danger m-2'>
                    Crear
                  </Button>
                </Grid>
            </Grid>
            </Paper>
      </Container>
    </ThemeProvider>
    );
}
