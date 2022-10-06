module.exports = function(data){
  console.log('cambiar publicidad',data);
  let id = data._id || ''
  let previmg = ''
  if(data.image)previmg = `<img class="form-publicidad-img" src="${data.image}">`
  let url = data.url || ''
  let fin = ''
  let inicio = ''
  if(data.fin)fin = new Date(data.fin).toISOString().substring(0,10)
  if(data.inicio)inicio= new Date(data.inicio).toISOString().substring(0,10)
  let descripcion = data.descripcion || ''
  let imgrequired = ''
  if(id=='')imgrequired = 'required'
  console.log('datos:',data._id,id,previmg,url,fin,inicio,descripcion);
  let raw=`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>EDITAR PUBLICIDAD</title>
      <link rel="stylesheet" href="/public/static/layout.css">

    </head>
    <body onload="startTime()" class="subpagusuario form-publicidad">
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
      </ul>
      </div>
    </div>

      <div class="EditNoticia">
        <h1>EDITAR o SUBIR PUBLICIDAD</h1>
        <form method="post" action="/user/publicidad/${id}" enctype="multipart/form-data">
          <ul>
            <li class="imageupload">
              <label for="image">Imagen de la Publicidad</label>
              <input type="file" name="image" id="image" value="" ${imgrequired}>
              ${previmg}
            </li>
            <li>
              <label for="EditDescrpciónPublicidad">Descripción Alternativa</label>
              <p><textarea id="EditDescrpciónPublicidad" type="text" name="descripcion" rows="2" cols="60"
              spellcheck="true" required placeholder="Publicidad del Gobierno de la Provincia de Buenos Aires">${descripcion}</textarea></p>
            </li>
            <li>
              <label for="URLpublicidad">URL de la Publicidad (opcional)</label>
              <p><input id="URLpublicidad" type="url" name="url" size="45"
                spellcheck="true" value="${url}" placeholder="https://comecuco.org"></input></p>
              </li>
            <li>
              <label for="EditFechaInicioPublicidad">Fecha Inicio</label>
              <input id="EditFechaInicioPublicidad" type="date" name="inicio" value="${inicio}" required>
            </li>
            <li>
              <label for="EditFechaFinalPublicidad">Fecha Final</label>
              <input id="EditFechaFinalPublicidad" type="date" name="fin" value="${fin}" required>
            </li>
          </ul>

          <button type="submit" class="submitEditPublicidad">Guardar cambios y volver</button>
        </form>
      </div>
    </body>
  </html>
`
return raw;
}
