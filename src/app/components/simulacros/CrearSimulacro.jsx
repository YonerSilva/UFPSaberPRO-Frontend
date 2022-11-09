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
import SeleccionPreguntas, { CategoriaSubC, NomDescSimulacro, NumPre, TiempoSimulacro } from "./ProcesosCrearSimulacro";


const steps = [
  "Categorias y Subcategorias",
  "Nombre y Descripcion",
  "Carga de Preguntas",
  "Seleccion de Preguntas",
  "Tiempo del Simulacro",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CategoriaSubC />;
    case 1:
      return <NomDescSimulacro/>;
    case 2:
      return <NumPre/>;
    case 3:
      return <SeleccionPreguntas />;
    case 4:
      return <TiempoSimulacro/>;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();


export default function CrearSimulacro() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
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
          {activeStep === steps.length ? (
            <React.Fragment>
              <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" gutterBottom m={1} >
                  El simulacro ha sido guardado!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type='button' onClick={() => { navigate(-1) }} size='medium' className='btn btn-danger m-2'>
                  Volver
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
                <Button
                  color='error'
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Crear Simulacro" : "Siguiente"}
                </Button>

              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
