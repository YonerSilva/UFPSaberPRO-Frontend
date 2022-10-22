import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InventoryIcon from '@mui/icons-material/Inventory';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BentoIcon from '@mui/icons-material/Bento';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export default function MenuList() {
     const navigate = useNavigate();

     return (
          <React.Fragment>
               <ListItemButton onClick={() => { navigate('/productos') }}>
                    <ListItemIcon>
                         <InventoryIcon sx={{color:"green"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Inventario" />
               </ListItemButton>
               <ListItemButton onClick={() => { navigate('/productos_disponibles') }}>
                    <ListItemIcon>
                         <BentoIcon sx={{color:"green"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Productos Disponibles" />
               </ListItemButton>
               <ListItemButton onClick={() => { navigate('/reportes') }}>
                    <ListItemIcon>
                         <SummarizeIcon sx={{color:"green"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Reportes" />
               </ListItemButton>
               <ListItemButton onClick={() => { navigate('/grafica_ventas') }}>
                    <ListItemIcon>
                         <AutoGraphIcon sx={{color:"green"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Gráfica Ventas" />
               </ListItemButton>
          </React.Fragment>
     );
}