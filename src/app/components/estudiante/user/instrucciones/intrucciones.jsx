import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Intrucciones_Examen = () => {
  return (
    <div classname="bootstrap-wrapper">
      <div classname="container">
        <div classname="row"></div>
        <div classname="col-md-12">
          <Card classname="mt20">
            <CardHeader>
              <Typography >
                Lea las instrucciones de esta página cuidadosamente
              </Typography>
            </CardHeader>
            <Typography variant="body2" color="text.secondary">Un paso más para ir</Typography>
            <CardContent classname="ml30">
              <h1>{ /*examen.titulo*/}</h1>
              {/* <p>{{ examen.descripcion }}</p> */}
              <hr />
              {/* <br> */}
              <h1>Instrucciones importantes</h1>

              <ul>
                <li>Este cuestionario es solo para fines de práctica</li>
                <li>Tienes que enviar el cuestionario en <b>{/*{ examen.numeroDePreguntas * 2 }*/} minutos</b></li>
                <li>Puede intentar el cuestionario cualquier cantidad de veces</li>
                {/* <li>Hay <b>{{ examen.puntosMaximos/examen.numeroDePreguntas }} puntos por pregunta</b></li> */}
              </ul>
              <hr />
              {/* <br> */}
              <h1>Intentos de la prueba</h1>
              <ul>
                <li>Presione el boton <b>Empezar</b> para iniciar el examen</li>
                <li>El tiempo comenzará en el momento en que haga click en el botón de inicio</li>
                <li>No puede reanudar este cuestionario si se interrumpe por algún motivo</li>
                <li>Desplácese hacia abajo para pasar a la siguiente pregunta</li>
                <li>Haga clic en el botón enviar cuestionario al finalizar el cuestionario</li>
                <li>El informe de la prueba se genera automáticamente en forma de copia PDF</li>
              </ul>
            </CardContent>
            <CardActions classname="text-center mb20">
              <button onClick={() => { }}  color="primary">
                Comenzar prueba
              </button>
            </CardActions>
          </Card >
        </div>
      </div>
    </div>
  );
}

export default Intrucciones_Examen;
