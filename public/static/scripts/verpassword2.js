// primero seleccionamos el elemento id del button
verpassword.addEventListener("mousedown", ( ) =>{
              // Eliminamos su type del input
               password.removeAttribute("type");
});
verpassword.addEventListener("mouseup", ( ) => {
              // Agregamos type de input
              password.setAttribute("type", "password");
});
