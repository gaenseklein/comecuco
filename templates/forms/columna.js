module.exports = function(dataobj){
  let title = dataobj.title || ''
  let autorId = dataobj.autorId
  let autor = dataobj.autor
  let descripcion = dataobj.descripcion || ''
  let optautor = ''
  let optcomecuco = ''
  if(dataobj.selectedAutor == 'comecuco')optcomecuco = 'selected';
  else optautor = 'selected';
  let url = dataobj.url || ''
  let micolumna = dataobj.url || 'mi-columna'
  let columnaId = dataobj.id || ''

  let raw=`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>EDITAR Columna</title>
      <link rel="stylesheet" href="/public/static/layout.css">
      <script src="/public/static/scripts/urlcleaner.js"></script>
    </head>
    <body class="subpagusuario editColumna">
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

      <div class="EditNoticia">
        <form method="post" action="/user/columna" enctype="multipart/form-data">
        <input type="hidden" name="id" value="${columnaId}">
          <ul>
            <li>
              <label for="EditTituloColumna">Título de la Columna</label>
              <p><input id="EditTituloColumna" type="text" name="title" size="45" maxlength="40" spellcheck="true"
                value="${title}" required></input></p>
            </li>
            <li>
              <label for="EditURLColumna">URL de la columna</label>
              <p><input id="EditURLColumna" type="text" name="url" size="45" maxlength="40" spellcheck="true"
                value="${url}" placeholder="mi-columna" required pattern="[A-Za-z\-]{4,}" onkeyup="cleanurl(this,URLColumnaPreview,'columnas/')"><span id="URLColumnaPreview">https://www.comecuco.org/columna/${micolumna}</span></p>
            </li>
            <li>
              <label for="EditAutorColumna">Autor de la Columna</label>
              <select id="EditAutorColumna" class="" name="autor">
                <option value="${autor}" ${optautor}>${autor}</option>
                <option value="comecuco" ${optcomecuco}>COMECUCO</option>
              </select>
            </li>
            <li>
              <label for="EditDescripciónColumna">Descripción de la Columna</label>
              <p><textarea id="EditDescripciónColumna" type="text" name="descripcion" rows="10" cols="100"
              spellcheck="true" required placeholder="entra una descripcion de la columna">${descripcion}</textarea></p>
            </li>
            <!--
            <ul id="sumafotos">
              <li id="ListaAgregarFotosEditNoticia" class="fotoUpload active">
                <label for="AgregarFotosEditNoticia">Cargar Foto de la Columna</label>
                <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEditNoticia" accept=".png, .jpeg, .jpg, .gif" name="foto1" value="">
              </li>
            </ul>
            -->
            <input type="submit" value="guardar">
          </form>
        </div>
      <div class="footer">
      </div>
    </body>

  </html>
`
return raw;
}
