// primero seleccionamos el elemento id del button
verpassword.addEventListener("mousedown", ( ) =>{
              // Eliminamos su type del input
               password.removeAttribute("type");
});
verpassword.addEventListener("mouseup", ( ) => {
              // Agregamos type de input
              password.setAttribute("type", "password");
});

/*
// primero seleccionamos el elemento id del button
verpassword2.addEventListener("mousedown", ( ) =>{
              // Eliminamos su type del input
               repeatpassword.removeAttribute("type");
});
verpassword2.addEventListener("mouseup", ( ) => {
              // Agregamos type de input
              repeatpassword.setAttribute("type", "password");
});
*/
