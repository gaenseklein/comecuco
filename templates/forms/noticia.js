module.exports = function(dataobj){
  let data = dataobj.noticia
  let resumen = data.resumen || ''
  let x=0;
  let checked = {
    noticia: (data.tipo==='noticia') ? 'checked': '',
    capitulo: (data.tipo==='capitulo') ? 'checked': '',
    resumensemanal: (data.tipo==='resumensemanal') ? 'checked': '',
    frontpage: data.frontpage ? 'checked': '',
  }
  if(dataobj.new){
    checked.noticia='checked'
  }
  let columnaoptions=''
  for(x=0;x<dataobj.columnas.length;x++){
    columnaoptions+= `<option value="${dataobj.columnas[x]._id}">${dataobj.columnas[x].title}</option>`
  }
  let imagetitle = ''
  if(data.images[0])imagetitle=data.images[0].title

  let eliminarfotosmenu=''
  for(x=0;x<data.images.length;x++){
    eliminarfotosmenu+=`<li class="grideliminarfotoyaudio">
      <div>
        <input type="checkbox" id="eliminarfoto${x}" name="eliminarfotos" value="${data.images[x].url}">
        <label for="eliminarfoto${x}">Eliminar</label>
        <img class="EditfotosdeNoticia" id="EliminarEditfotosdeNoticia${x}" src="${data.images[x].url}" alt="">
      </div>
    </li>`
  }
  let eliminaraudios = ''
  let checkedauthor=''
  let checkedauthorcomecuco='';
  let checkedauthorcolectiva='';
  if(data.author=='comecuco')checkedauthorcomecuco='selected';
  if(data.author=='colectiva')checkedauthorcolectiva='selected';
  else checkedauthor='selected';
  for(x=0;x<data.audios.length;x++){
    eliminaraudios+=`<li>
      <input type="checkbox" id="eliminaraudio${x}" name="eliminaraudios" value="${data.audios[x].url}">
      <label for="eliminaraudio${x}">Eliminar</label>
      <div class="Editaudiosyvideos">
        <p class=tituloAudio>${data.audios[x].description}</p>
        <div class="cuadrocontrol">
          <audio src="${data.audios[x].url}" controls=""></audio>
          <a href="${data.audios[x].url}" download>&#9196;</a>
        </div>
      </div>
    </li>`
  }
  let pdate = new Date(data.pubdate)
  let pm = pdate.getMonth()+1;
  let pd = pdate.getDate();
  if(pm<10)pm='0'+pm
  if(pd<10)pd='0'+pd
  let pubdate = pdate.getFullYear()+'-'+pm+'-'+pd
  let rscnumero = data.numero || ''
  let videolink = ''
  if(data.videolink && data.videolink.url)videolink = data.videolink.url
  let raw=`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>EDITAR NOTICIA</title>
      <link rel="stylesheet" href="/public/static/layout.css">
      <script src="/public/static/scripts/fileuploadstepper.js"></script>

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
            <li><a href="/user/manualdeestilo">Manual de Uso y Estilo</a></li>
          </ul>
        </div>
      </div>

      <div class="EditNoticia">
        <h1>EDITAR o SUBIR NOTICIA</h1>
        <form method="post" action="/user/noticia" enctype="multipart/form-data">
        <input type="hidden" name="id" value="${data._id}">
        <input type="hidden" name="isnew" value="${(dataobj.new==true)}">
          <ul>
            <li>
              <label>Tipo</label>
              <div class="tipoWrapper">

                <input id="radioNoticia" type="radio" name="tipo" value="noticia" ${checked.noticia}>
                <label for="radioNoticia" class="radiolabel">Noticia común</label>
                <input id="radioCapitulo" type="radio" name="tipo" value="capitulo" ${checked.capitulo}>
                <label for="radioCapitulo" class="radiolabel">Capitulo de una columna</label>
                <input id="radioSemanal" type="radio" name="tipo" value="resumensemanal" ${checked.resumensemanal} onclick="document.getElementById('EditAutorNoticia').value='comecuco'">
                <label for="radioSemanal" class="radiolabel">Resumen Semanal</label>
                <div class="noticiaWrapper">
                  <label for="enPaginaPrincipal">Publicar en Página Principal</label>
                  <input type="checkbox" id="enPaginaPrincipal" name="frontpage" ${checked.frontpage}>
                </div>
                <div class="columnaWrapper">
                    <select class="columnaSelect" name="columna">
                      ${columnaoptions}
                    </select>
                </div>
                <div id="rscnumero">
                  <label for="RSC">Emisión Nº</label>
                  <input type="text" name="numero" value="${rscnumero}">
                </div>
              </div>
            </li>
            <li>
              <label for="EditTituloNoticia">Título</label>
              <p><input id="EditTituloNoticia" type="text" name="title" size="45" spellcheck="true"
                value="${data.title}" required></p>
            </li>
            <li>
              <label for="EditSubTituloNoticia">Subtítulo</label>
              <p><input id="EditSubTituloNoticia" type="text" name="subtitle" size="45" spellcheck="true"
                value="${data.subtitle || ''}"></p>
            </li>
            <li>
              <label for="EditResumen">Resumen</label>
              <p><textarea id="EditResumen" type="text" name="resumen" rows="2" cols="60"
              spellcheck="true">${resumen}</textarea></p>
            </li>
            <li>
              <label for="addTags">Tags</label>
              <div class="tagWrapper">
                <div id="tagdisplay">
                  <span id="noTagEligido">no contiene tag</span>
                </div>
                <input id="tagsContainer" type="text" name="tags" value="${data.tags.join(',')}">
                <div id="addTagDialog">
                  <button type="button" id="openDialog" onclick="tagcontroler.openDialog()">añadir tag</button>
                  <button type="button" id="newTagButton" onclick="tagcontroler.newTag()">crear nuevo tag</button>
                </div>
                <input type='hidden' id="alltags" value="${dataobj.alltags}">
              </div>
            </li>
            <li>
              <label for="EditAutorNoticia">Autor de la Noticia</label>
              <select id="EditAutorNoticia" class="" name="autor">
                <option value="${dataobj.user.name}" ${checkedauthor}>${dataobj.user.name}</option>
                <option value="comecuco" ${checkedauthorcomecuco}>COMECUCO</option>
                <option value="colectiva" ${checkedauthorcolectiva}>COMECUCO Producción Colectiva</option>
              </select>
            </li>
            <li>
              <label for="EditFechaNoticia">Fecha de la Noticia</label>
              <input id="EditFechaNoticia" type="date" name="fecha" value="${pubdate}">
            </li>
            <li>
              <label for="EditContenidoNoticia">Contenido</label>
              <p><textarea id="EditContenidoNoticia" type="text" name="body" rows="20" cols="100"
              spellcheck="true" required>${data.body}</textarea></p>
            </li>
            <li>
              <label for="EditEpigrafeFoto">Epígrafe de la primer imagen</label>
              <p><input id="EditEpigrafeFoto" type="text" name="fototext" size="45"
                spellcheck="true" value="${imagetitle}"></p>
              </li>
          </ul>
          <ul id="sumafotos">
            <li id="ListaAgregarFotosEditNoticia0" class="fotoUpload active">
              <label for="AgregarFotosEditNoticia0">Agregar Fotos +</label>
              <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEditNoticia0" accept=".png, .jpeg, .jpg, .gif" name="foto1" value="">
            </li>
            <li id="ListaAgregarFotosEditNoticia1" class="fotoUpload">
              <label for="AgregarFotosEditNoticia1">Agregar Fotos +</label>
              <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEditNoticia1" accept=".png, .jpeg, .jpg, .gif" name="foto2" value="">
            </li>
            <li id="ListaAgregarFotosEditNoticia2" class="fotoUpload">
              <label for="AgregarFotosEditNoticia2">Agregar Fotos +</label>
              <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEditNoticia2" accept=".png, .jpeg, .jpg, .gif" name="foto3" value="">
            </li>
            <li id="ListaAgregarFotosEditNoticia3" class="fotoUpload">
              <label for="AgregarFotosEditNoticia3">Agregar Fotos +</label>
              <input type="file" onclick="deleteOldSelection(this)" onchange="showNextFileUploads(this)" id="AgregarFotosEditNoticia3" accept=".png, .jpeg, .jpg, .gif" name="foto4" value="">
            </li>
          </ul>
          <ul class="EditFotosNoticia" id="EditFotosNoticia">
            ${eliminarfotosmenu}
          </ul>
          <ul>
            <li class="audioUpload active" id="ListaAgregarAudiosEditNoticia">
              <label class="uploadlabel" for="AgregarAudios">Agregar Audios o Videos</label>
              <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios" name="audio1" value="">
            </li>
            <li class="audioUpload" id="ListaAgregarAudiosEditNoticia1" class="ListaAgregarAudiosEditNoticia">
              <label class="uploadlabel" for="AgregarAudios1">Agregar Audios o Videos</label>
              <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios1" name="audio2" value="">
            </li>
            <li class="audioUpload" id="ListaAgregarAudiosEditNoticia2" class="ListaAgregarAudiosEditNoticia">
              <label class="uploadlabel" for="AgregarAudios2">Agregar Audios o Videos</label>
              <input class="uploadinput" type="file" onchange="showNextFileUploads(this)" id="AgregarAudios2" name="audio3" value="">
            </li>
          </ul>
          <ul id="EditAudiosYVideos">
            ${eliminaraudios}
          </ul>
          <ul class="videourl">
            <li>
            <label for="videolink" title="eg https://youtu.be/MVxfjY-2K5c o https://www.youtube.com/watch?v=MVxfjY-2K5c">Agregar link a youtube</label>
            <input type="text" name="videolink" id="videolink" value="${videolink}">
            </li>
          </ul>
          <button type="submit" class="submitEditNoticia botonFinal">Guardar cambios y volver</button>
          <button type="button" class="EliminarNoticia botonFinal" id="botonELIMINAR" onclick="if(confirm('Quieres borrar esta noticia?'))location.href='/user/borrar/noticia/${data._id}'">ELIMINAR la Noticia</button>
        </form>
      </div>
      <div class="footer">
      </div>
    </body>
    <script src="/public/static/scripts/eligirtags.js">
    </script>
  </html>
`
return raw;
}
