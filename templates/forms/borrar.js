module.exports = function(dataobj){
  let title = dataobj.noticia.title || ''
  let nid = dataobj.noticia._id
  let previmg = ''
  if(dataobj.noticia.images && dataobj.noticia.images[0] && dataobj.noticia.images[0].url)previmg=dataobj.noticia.images[0].url
  let body = dataobj.noticia.body
  console.log('borrar',dataobj);
  let raw=`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>EDITAR Columna</title>
      <link rel="stylesheet" href="/public/static/layout.css">
      <script src="/public/static/scripts/urlcleaner.js"></script>
    </head>
    <body class="subpagusuario">
      <div class="logo">
        <p class="encabezado"><a href="/">
          COMECUCO</a>
        </p>
        <div class="subtitle">
          somos el colectivo de medios comunitarios de cuyo
        </div>
        <div class="topMenu">
          <ul>
            <li><a href="/user">Volver</a></li>
            <li><a href="manualdeestilo.html">Manual de Estilo</a></li>
          </ul>
        </div>
      </div>

      <div class="">
        <h1>borrar articulo ${title}</h1>
        <h2>estas seguro que quieres borrar este articulo?</h2>
        <form id="borrararticuloform" action="/user/borrar/noticia/${nid}" method="post">
            <input type="hidden" name="nid" value="${nid}">
            <div>
            <input type="checkbox" name="confirm" id="confirmdelete">
            <label for="confirmdelete">si, estoy seguro</label>
            </div>
            <div>
            <label for="contrasena">entra tu contraseña para asegurar que lo quieres borrar</label>
            <input type="password" name="pwd" id="contrasena">
            </div>
            <div>
                <a href="/user">cancelar</a>
                <input type="submit" value="borrar este articulo">
            </div>
        </form>
        <hr>
        <h2>prevista del articulo</h2>
        <div class="previstawrapper">
            <img src="${previmg}">
            <h3>${title}</h3>
            <div class="body">
                ${body}
            </div>
        </div>

      </div>
      <div class="footer">
      </div>
    </body>

  </html>
`
return raw;
}
