import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Form } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useDispatch, useStore } from '../../store/Provider/storeProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { alert_error, alert_loading, alert_success, firstCharUpper } from '../../util/functions';
import * as service from "../../store/services/UsuarioService";
import { updateUserFirebase } from '../../util/firebase';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme();

export default function EditarUsuario() {

    const navigate = useNavigate();
    const { formEditionUsu } = useStore();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const valores_iniciales = {
        id_usuario: "",
        nombre: "",
        apellido: "",
        codigo: "",
        programa: "",
        password: "",
        email: "",
        rol: ""
    };

    const [user, setUser] = useState(valores_iniciales);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usuario = upperCase();
            service.update(usuario).then(response => {
                if (response.error === null) {
                    if (usuario.rol.id_rol !== 3) {
                        updateUserFirebase(usuario.email.toLowerCase(), usuario.password);
                    }
                    alert_success("¡Proceso Exitoso!", response.message);
                    listarUsuarios();
                } else {
                    alert_error("¡Error!", response.error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const listarUsuarios = () => {
        service.getUsuariosPrograma().then(response => {
            if (response.error === null) {
                dispatch({
                    type: "SET_LISTA_USUARIOS_PRG",
                    payload: response.usuarios
                });
                alert_loading(response.message);
                navigate("/UFPSaberPRO/a/usuarios");
            } else {
                alert_error("¡Error!", response.message);
            }
        });
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        // Anything in here is fired on component mount.
        if (Object.keys(formEditionUsu).length !== 0) {
            setUser({
                id_usuario: formEditionUsu.id_usuario,
                nombre: formEditionUsu.usu_nombre,
                apellido: formEditionUsu.usu_apellido,
                codigo: formEditionUsu.usu_codigo,
                programa: formEditionUsu.cod_programa,
                email: formEditionUsu.usu_email,
                rol: formEditionUsu.rol
            });
        } else {
            navigate("/UFPSaberPRO/a/usuarios");
        }
        return () => {
            // Anything in here is fired on component unmount.
            dispatch({
                type: "SET_FORM_EDITION_USU",
                payload: {}
            });
        }
    }, []);

    function upperCase() {
        const valores_iniciales = {
            id_usuario: user.id_usuario,
            nombre: firstCharUpper(user.nombre),
            apellido: firstCharUpper(user.apellido),
            codigo: user.codigo,
            programa: user.programa,
            email: user.email.toUpperCase(),
            password: user.password,
            rol: user.rol
        };
        return valores_iniciales;
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" p={2}>
                        Editar Usuario
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="codigo"
                                    name="codigo"
                                    label="Codigo"
                                    value={user.codigo}
                                    onChange={handleChange}
                                    multiline
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    inputProps={{ maxLength: 7 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre"
                                    value={user.nombre}
                                    onChange={handleChange}
                                    multiline
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="apellido"
                                    name="apellido"
                                    label="Apellido"
                                    value={user.apellido}
                                    onChange={handleChange}
                                    multiline
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type='email'
                                    value={user.email}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    autoComplete="shipping postal-code"
                                    variant="outlined"
                                    inputProps={{ maxLength: 100 }}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" size='large' fullWidth>
                                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={user.password}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 16 }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Contraseña"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type='button' size='medium' onClick={() => { navigate("/UFPSaberPRO/a/usuarios") }} className='btn btn-danger m-2'>
                                    Volver
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Button type='submit' size='medium' className='btn btn-danger m-2'>
                                    Actualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
