const template = function(){
    let raw = `<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Inicio de Sesión</title>
    <link rel="stylesheet" href="/public/static/layout.css">

  </head>
  <body class="subpaginainiciosesion">
    <div class="logo">
      <p class="encabezado"><a href="frontpage.html">
        COMECUCO</a>
      </p>
      <div class="subtitle">
        somos el colectivo de medios comunitarios de cuyo
      </div>
    </div>

    <div class="paginainiciosesion">
      <h1>Iniciar Sesión</h1>
      <img class="logocomecuco" src="/public/static/logos/comecuco.png" alt="Logo del COMECUCO">
      <form class="forminiciosesion" action="/iniciar" method="post">
        <label for="username">nombre de usuario</label>
        <input type="text" name="name" width="15" id="username">
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" maxlength="15" name="password" id="password" required>
          <button id="verpassword" type="button">👁</button>
        </div>
        <input type="submit" class="submit" value="Iniciar Sesión">
        <a href="nuevacontraseña.html" id="enlacenuevacontraseña">(o solicitar nueva Contraseña)</a>
      </form>
    </div>

    <div class="footer">
    </div>
  </body>
  <script src='/public/static/scripts/verpassword2.js'></script>
</html>
    `;
    return raw;
}

module.exports = template;
