//Alertas Bonitas
import toast from 'react-hot-toast';

import { useState } from "react";

export function alert_success(success, message) {
     toast.success(success + "\n" + message, {
          duration: 1500,
          position: "bottom-right",
     });
};

export function alert_logout() {
     toast.promise(
          new Promise((resolve, reject) => {
               setTimeout(()=>{
                    resolve();
                    setTimeout(()=>window.location.href="/", 1500);
               }, 2000)
          }),
          {
               loading: 'Cerrando Sesión...',
               success: <b>Sesión cerrada con éxito!</b>,
               error: <b>Error, intente de nuevo cerrar sesión.</b>,
          }
     );
}

export function alert_error(error, message) {
     toast.error(error + "\n" + message,{
          position: "bottom-right",
     });
};

export function verificarCamposRegister() {
     let nombre = document.getElementById("nombre").value;
     let apellido = document.getElementById("apellido").value;
     let email = document.getElementById("email").value;
     let password = document.getElementById("password").value;
     if (nombre === "" || apellido === "" || email === "" || password === "") {
          alert_error("Oops...!", "Los campos no pueden estar vacios.");
     } else {
          if (verificarContraseña()) {
               let button = document.getElementById("btn_register_user");
               button.setAttribute('type', 'submit');
          }
     }
};

function verificarContraseña() {
     let password = document.getElementById('password').value;
     if (password.length >= 8) {
          let codigo, mayus, mini, num;
          mayus = false;
          mini = false;
          num = false;
          for (let index = 0; index < password.length; index++) {
               codigo = password.charCodeAt(index);
               //Mayusculas
               if (codigo >= 65 && codigo <= 90) {
                    mayus = true;
               }
               //Minusculas
               if (codigo >= 97 && codigo <= 122) {
                    mini = true;
               }
               //Numeros
               if (codigo >= 48 && codigo <= 57) {
                    num = true;
               }
          }
          if (mayus && mini && num) {
               return true;
          }
     } else {
          alert_error("Error!", "La contraseña debe tener como minimo 8 caracteres. \n Además, la contraseña debe tener al menos una letra mayuscula, una minuscula y un numero.");
          return false;
     }
}

export function firstCharUpper(cadena) {
     let array = cadena.split(" ");
     let word = "";
     cadena = "";
     for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array[i].length; j++) {
               if (j === 0) {
                    word += array[i].charAt(j).toUpperCase();
               } else {
                    word += array[i].charAt(j);
               }
          }
          cadena += word;
          word = "";
          if ((i + 1) < array.length) {
               cadena += " ";
          }
     }
     return cadena;
}

export function generateClick() {
     let element = document.getElementById("btn_register");
     element.click();
}
