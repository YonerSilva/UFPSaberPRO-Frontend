import React from "react";

const Barra = ({ button, input }) => {
     return (
          <nav className="navbar navbar-light bg-light rounded">
               <div className="container-fluid">
                    {button}
                    <div className="d-flex">
                         {input}
                    </div>
               </div>
          </nav>
     )
}

export default Barra;