                                      import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import "../../../index.css";
import { SeleccionPreguntas, CategoriaSubC, NomDescSimulacro } from "./ProcesosCrearSimulacro";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useStore } from "../../store/Provider/storeProvider";
import Cargador from "../extra/CargadorEventos";
import { Form } from "react-bootstrap";


const steps = [
  "Información Simulacro",
  "Seleccion de Preguntas",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <NomDescSimulacro />;
    case 1:
      return <SeleccionPreguntas />;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();


export default function CrearSimulacro() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { formEditionSimu } = useStore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const simulacro = {
    id_simulacro: "",
    nombre: "",
    descripcion: "",
    puntaje_maximo: "",
    categoria: "",
    subcategoria: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formEditionSimu)
      /*toast.promise(new Promise((resolve, reject) => {
        if (update) {
          servicePregunta.actualizar(pregunta).then(response => {
            listarPreguntas(response);
            resolve();
          });
        } else {
          servicePregunta.guardar(pregunta).then(response => {
            if (response.error === null) {
              if (verificarImagen()) {
                let preg = {
                  id_pregunta: response.pregunta.id_pregunta,
                  imagen: "",
                  descripcion: response.pregunta.preg_descripcion,
                  estado: response.pregunta.preg_estado,
                  id_subcategoria: response.pregunta.id_subcategoria
                }
                cargarImagen(preg.id_pregunta, "preguntas").then(url => {
                  if (url !== "") {
                    preg.imagen = url;
                    servicePregunta.actualizar(preg).then(respuesta => {
                      listarPreguntas(response);
                      resolve();
                    });
                  }
                });
              } else {
                listarPreguntas(response);
                resolve();
              }
            }
            else {
              reject();
            }
          });
        }
      }), {
        loading: "Cargando...",
        error: "¡Error! \n" + "Ha ocurrido un imprevisto.",
        success: "¡Proceso Exitoso!",
      });*/
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (Object.keys(formEditionSimu).length === 0) {
      dispatch({
        type: "SET_FORM_EDITION_SIMU",
        payload: simulacro
      });
      setLoading(false);
    }

    return () => {
      dispatch({
        type: "SET_FORM_EDITION_SIMU",
        payload: {}
      })
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        {
          (() => {
            if (!loading) {
              return (
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h4" align="center">
                    Datos del Simulacro
                  </Typography>
                  <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                      <Step
                        key={label}
                        sx={{
                          '& .MuiStepLabel-root .Mui-completed': {
                            color: 'error.dark', // circle color (COMPLETED)
                          },
                          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                          {
                            color: 'grey.500', // Just text label (COMPLETED)
                          },
                          '& .MuiStepLabel-root .Mui-active': {
                            color: 'error.main', // circle color (ACTI VE)
                          },
                          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                          {
                            color: 'common.white', // Just text label (ACTIVE)
                          },
                          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                            fill: 'white', // circle's number (ACTIVE)
                          },
                        }}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <React.Fragment>
                    <Form onSubmit={handleSubmit}>
                      {getStepContent(activeStep)}
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {activeStep !== 0 && (
                          <Button color='error' onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Volver
                          </Button>
                        )}
                        {activeStep === 0 && (
                          <Button color='error' onClick={() => { navigate(-1) }} sx={{ mt: 3, ml: 1 }}>
                            Volver
                          </Button>
                        )}
                        {activeStep === (steps.length - 1) && (
                          <Button type="submit" color='error' variant="contained" sx={{ mt: 3, ml: 1 }}>
                            Crear Simulacro
                          </Button>
                        )}
                        {activeStep < (steps.length - 1) && (
                          <Button type="button" color='error' variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                            Siguiente
                          </Button>
                        )}
                      </Box>
                    </Form>
                  </React.Fragment>
                </Paper>
              )
            } else {
              return (<Cargador />)
            }
          })()
        }
      </Container>
    </ThemeProvider>
  );
}
