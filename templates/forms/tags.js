module.exports = function(data){

  let raw=`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>COMECUCO - editar tags</title>
      <link rel="stylesheet" href="/public/static/layout.css">


    </head>
    <body class="subpagusuario">
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
          <li><a href="/user">Volver</a></li>
          <li><a href="/user/manualdeestilo">Manual de Estilo</a></li>
        </ul>
      </div>
    </div>
    <h1>editar tags</h1>

    </body>
    <script src="/public/static/scripts/tagadmin.js"></script>
  </html>
`
return raw;
}
