import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function Subcategorias() {
  const [state, setState] = React.useState({
    comEscri: false,
    razCuanti: false,
    lecCri: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { comEscri, razCuanti, lecCri } = state;
  const error = [comEscri, razCuanti, lecCri].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Subcategoria:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={comEscri} onChange={handleChange} name="comEscri" />
            }
            label="Comunicacion Escrita"
          />
          <FormControlLabel
            control={
              <Checkbox checked={razCuanti} onChange={handleChange} name="razCuanti" />
            }
            label="Razonamiento Cuantitativo"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lecCri} onChange={handleChange} name="lecCri" />
            }
            label="Lectura Critica"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}