import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import routes from "../routes/routes_vista";
import ProtectedRoutes from "./accessRoutes";
import NotFound from '../views/NotFound';


const Rutas = () => {
     return (
          <Router>
               <Routes>
                    <Route element={<ProtectedRoutes/>}>
                         {routes.private.map((element) => (
                              element
                         ))}
                    </Route>

                    {routes.public.map(({ path, element, name }) => (
                         <Route exact path={path} element={element} key={name} />
                    ))}
                    <Route path="*" element={<NotFound/>}/>
               </Routes>
          </Router>
     );
};

export default Rutas;