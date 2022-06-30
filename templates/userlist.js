module.exports = function(data){
  let x=0;
  let userlist = ''
  for(x=0;x<data.length;x++){
    let nombre = data[x].name
    let login = new Date(data[x].lastLogin).toLocaleString('es')
    let ultimasubida = new Date(data[x].ultimaSubida).toLocaleString('es')
    let accion = ''
    userlist+=`<li>
      <span>${nombre}</span>
      <span>${login}</span>
      <span>${ultimasubida}</span>
      <span>${accion}</span>
    </li>`
  }

  let raw = `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Bienvenido</title>
      <link rel="stylesheet" href="/public/static/layout.css">
      <script src="/public/static/scripts/dashboard.js"></script>
    </head>
    <body class="dashboard userlist">
    <div class="menusubusuario">
      <div class="logo" id="logoUsuario">
        <p class="encabezado"><a href="/">
          COMECUCO</a>
        </p>
        <div class="subtitle">
          somos el colectivo de medios comunitarios de cuyo
        </div>
      </div>
      <div class="topMenu" id="topMenuUsuario">
        <ul>
          <li><a href="/iniciar/logout">Cerrar Sesión</a></li>
        </ul>
      </div>
    </div>
    <h1 class="bienvenido">Lista de usuarios de comecuco</h1>
    <ul class="userlistmenu">
      <li>
        <span>nombre</span>
        <span>ultimo login</span>
        <span>ultima subida</span>
        <span>acción</span>
      </li>
      ${userlist}
    </ul>
    <div class="footer">
    </div>
    </body>

  </html>

  `
  // console.log('builded dash-page',raw);
  return raw;
}
