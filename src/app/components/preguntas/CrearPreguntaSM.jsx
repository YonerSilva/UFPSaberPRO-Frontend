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
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

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

const subcategorias = [
    {
        value: 'CE',
        label: 'Comunicacion escrita'
    },
    {
        value: 'b',
        label: 'Razonamiento Cuantitativo'
    },
    {
        value: 'LC',
        label: 'Lectura Critica'
    },
    {
        value: 'CC',
        label: 'Competencias Ciudadanas'
    },
    {
        value: 'I',
        label: 'Ingles'
    },
    {
        value: 'CS',
        label: 'Cuestionario Socioeconomico'
    },
]

const tipopregunta = [
    {
        value: 'PA',
        label: 'Pregunta Abierta'
    },
    {
        value: 'PC',
        label: 'Pregunta Cerrrada'
    },
]

const theme = createTheme();

export default function CrearPregunta() {

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
                        Crear Preguntas
                    </Typography>
                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Categoria"
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
                        <Grid item xs={12} >
                            <TextField
                                id="address2"
                                name="address2"
                                label="Subcategorias"
                                required
                                select
                                value={currency}
                                onChange={handleChange}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined">
                                {subcategorias.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="address2"
                                name="address2"
                                label="Tipo de Pregunta"
                                required
                                select
                                value={currency}
                                onChange={handleChange}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined">
                                {tipopregunta.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="descripPregunta"
                                name="descripPregunta"
                                label="Descripcion de la Pregunta"
                                rows={5}
                                multiline
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                maxlength="500"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="opcion1"
                                name="opcion1"
                                label="Opcion A"
                                rows={5}
                                fullWidth
                                multiline
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                maxlength="500"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="opcion2"
                                name="opcion2"
                                label="Opcion B"
                                rows={5}
                                fullWidth
                                multiline
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                maxlength="500"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="opcion3"
                                name="opcion3"
                                label="Opcion C"
                                rows={5}
                                fullWidth
                                multiline
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                maxlength="500"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="opcion4"
                                name="opcion4"
                                label="Opcion D"
                                rows={5}
                                fullWidth
                                multiline
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                maxlength="500"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button size='medium' className="btn-danger">
                                <IconButton sx={{ color: '#fff'}} aria-label="upload file" component="label">
                                    <input hidden accept="image/*" type="file" />
                                    <ImageSearchIcon sx={{mr: 1}}/>
                                    Subir Imagen
                                </IconButton>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button size='medium' className='btn btn-danger m-2'>
                                Volver
                            </Button>
                            <Button size='medium' className='btn btn-danger m-2'>
                                Crear
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button size='medium' className="btn-danger">
                                <IconButton  sx={{ color: '#fff'}} aria-label="upload file" component="label">
                                    <input hidden type="file" />
                                    <CloudUploadIcon sx={{mr: 1}}/>
                                    Subir Archivo
                                </IconButton>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
