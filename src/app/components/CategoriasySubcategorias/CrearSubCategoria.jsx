import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


const theme = createTheme();

const categorias = [
    {
        value: "GE",
        label: "Generica",
    },
    {
        value: "ES",
        label: "Especifica",
    },
];

export default function CategoriaySubcategorias() {

    const navigate = useNavigate();
    const [currency, setCurrency] = React.useState("");

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center" p={2}>
                        Crear Subcategorias
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="categorias-creadas"
                                name="categorias-creadas"
                                label="Categoria a la que Pertenece"
                                required
                                select
                                value={currency}
                                onChange={handleChange}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                            >
                                {categorias.map((option) => (
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
                                label="Nombre de la Subcategoria Nueva"
                                multiline
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                maxlength="100"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            spacing={2}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <IconButton onClick={() => { navigate() }} title='agregarSubC' style={{ color: "red" }}><PlaylistAddIcon />Agregar otra SubCategoria</IconButton>
                        </Grid>
                        <Grid
                            item
                            xs
                            sx={{ display: "flex", justifyContent: "end" }}
                        >
                            <Button onClick={() => { navigate(-1) }} size="large" className="btn btn-danger m-2">
                                Volver
                            </Button>
                            <Button size="large" className="btn btn-danger m-2">
                                Crear
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
