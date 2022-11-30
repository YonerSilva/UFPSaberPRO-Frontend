//Alertas Bonitas
import toast from 'react-hot-toast';

export function alert_success(success, message) {
     toast.success(success + "\n" + message, {
          duration: 3000,
          position: "bottom-right",
     });
};

export function alert_loading(success) {
     toast.promise(
          new Promise((resolve, reject) => {
               setTimeout(() => {
                    resolve();
               }, 3000)
          }),
          {
               loading: "Cargando Información...",
               success: <b>{success}</b>,
               error: <b>¡Oops!, Error...</b>,
          }, { position: "bottom-right" }
     );
}
export function alert_logout() {
     toast.promise(
          new Promise((resolve, reject) => {
               setTimeout(() => {
                    resolve();
                    setTimeout(() => window.location.href = "/", 1500);
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
     toast.error(error + "\n" + message, {
          position: "bottom-right",
     });
};

export function verificarCamposRegister() {
     try {
          let nombre = document.getElementById("nombre").value;
          let apellido = document.getElementById("apellido").value;
          let codigo = document.getElementById("codigo").value;
          let programa = document.getElementById("programa").value;
          let email = document.getElementById("email").value;
          let password = document.getElementById("password").value;
          let rol = document.getElementById("rol").value;
          if (nombre === "" || apellido === "" || codigo === "" || rol === "" || programa === "" || email === "" || password === "") {
               throw new Error("Los campos no pueden estar vacios.");
          } else {
               if (verificarContraseña(password) && verificarCodigo(codigo, programa)) {
                    let button = document.getElementById("btn_register_user");
                    button.setAttribute('type', 'submit');
               }
          }
     } catch (error) {
          alert_error("¡Error!", error);
     }
};

function verificarCodigo(codigo, programa) {
     let cod = new String(codigo);
     if (cod.length === 7) {
          let prg = cod.substring(0, 3);
          if (prg === programa.toString()) {
               return true;
          } else {
               throw new Error("El codigo no coincide con el programa seleccionado.");
          }
     } else {
          throw new Error("El codigo debe tener 7 numeros.");
     }
}

function verificarContraseña(password) {
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
          throw new Error("La contraseña debe tener como minimo 8 caracteres. \n Además, la contraseña debe tener al menos una letra mayuscula, una minuscula y un numero.");
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

export function verificarImagen() {
     let inputFile = document.getElementById("formFile");
     if (inputFile.files.length !== 0) {
          return true;
     }
     return false;
}

