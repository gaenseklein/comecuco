const template = function(data){
    let x=0;
    let redesString = "";
    for(x=0;x<data.redes.length;x++){
        if(data.redes[x].red=='')continue;
        redesString+= " "+data.redes[x].red+" "+data.redes[x].url;
    }
    let eliminarfotos = "";
    if(data.images)for(x=0;x<data.images.length;x++){
        eliminarfotos+=`<li>
            <div>
              <input type="checkbox" id="eliminarfoto${x}" name="eliminarfotos" value="${data.images[x]}">
              <label for="eliminarfoto${x}">Eliminar</label>
              <img class="fotosdelmedio" id="fotosdelmedio" src="caruselpreview.png" alt="">
            </div>
          </li>`;
    }
    let raw = `
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>EDIT USUARIO LA LEÑERA</title>
    <link rel="stylesheet" href="/public/static/layout.css">
    <script src="/public/static/scripts/urlcleaner.js"></script>

  </head>
  <body onload="startTime()" class="subpagusuario">
  <div class="menusubusuario">
    <div class="logo" id="logoUsuario">
      <h1><a href="/">
          COMECUCO</a>
      </h1>
      <div class="subtitle">
        somos el colectivo de medios comunitarios de cuyo
      </div>
    </div>
    <div class="topMenu" id="topMenuUsuario">
      <ul>
        <li><a href="/user">Volver</a></li>
        <li><a href="/iniciar/logout">Cerrar Sesión</a></li>
      </ul>
    </div>
  </div>
    <div class="CajaEditUsuario">
      <img class="logomedio" src="${data.icon}" alt="Logo ${data.name}">
      <form class="FormEditUsuario" action="/user/cambia" method="post" enctype="multipart/form-data">
        <input type="hidden" name="uid" value="${data._id}">
        <ul id="datosdelusuario">
          <li>
            <label for="NombreUsuario">Nombre del Medio</label>
            <input id="NombreUsuario" type="text" name="name" value="${data.name}" size="40">
            <input id="drupalid" name="drupalid" value="" type="text" size="5" style="display:none;">
          </li>
          <li>
            <label for="UrlUsuario">URL del Medio</label>
            <div>
              <input id="UrlUsuario" type="text" name="url" value="${data.url}" size="15" onkeyup="cleanurl(this,this.nextElementSibling)">
              <span id="UrlUsuarioPreview">https://comecuco.org/${data.url}</span>
            </div>
          </li>
          <li id="AgregarLogoUsuario">
            <label>Logo</label>
            <div class="">
              <label for="newlogoupload" class="logopreview"><img src="${data.icon}"></label>
              <input type="file" id="newlogoupload" name="icon" value="">
            </div>
          </li>
          <li>
            <label for="DescripcionUsuario">Descripción</label>
            <p><textarea id="DescripcionUsuario" type="text" name="description" rows="10" cols="60"
            spellcheck="true">${data.description}</textarea></p>
          </li>
          <li>
            <label for="EmailUsuario">Email (para uso interno del COMECUCO y para entrar a la pagina)</label>
            <input id="EmailUsuario" type="email" name="email" value="${data.email}" size="40">
          </li>
          <li class="itempassword">
            <label for="password">Nueva Contraseña</label>
            <input id="password" type="password" name="password" value="" size="40">
            <button id="verpassword" type="button">👁</button>
          </li>
          <li class="itempassword2">
            <label for="repeatpassword">Repita la Nueva Contraseña</label>
            <input id="repeatpassword" type="password" name="" value="" size="40">
            <button id="verpassword2" type="button">👁</button>
          </li>
          <li>
            <label for="EmailPublicoUsuario">Email (para contacto público)</label>
            <input type="email" name="emailpublico" id="EmailPublicoUsuario" size="27" value="${data.publicEmail}">
          </li>
          <li>
            <label>Redes</label>
            <div class="redesWrapper">
              <button type="button" name="button" onclick="addSocialRed()">añadir nueva red</button>
              <div id="redesPreview">
                <!--<button type="button" name="button" class="redesButton" onclick="removeSocialRed()" value="facebook https://facebook.com/lalenera">facebook : https://facebook.com/lalenera x</button>-->
              </div>
              <input id="RedesUsuario" type="text" name="redes" value="${redesString}" size="40">
            </div>
          </li>
          <li>
            <label for="StreamingUsuario">Streaming</label>
            <div class="">
              <input id="StreamingUsuario" type="text" name="mountpoint" value="${data.mountpoint}" size="10" onkeyup="cleanurl(this,this.nextElementSibling,'envivo/')">
              <span>https://comecuco.org/envivo/stream</span>
            </div>
          </li>
          <li id="AgregarFotosUsuario">
            <label for="AgregarFotos">Agregar Fotos</label>
            <input type="file" id="AgregarFotos" name="foto" value="">
          </li>
        </ul>
        <ul class="fotosdeusuario" id="fotosdeusuario">
          ${eliminarfotos}
        </ul>
        <input type="submit" class="submitusuario" value="Guardar cambios para Usuario">
      </form>
    </div>
  </body>
  <script src='/public/static/scripts/verpassword2.js'></script>
  <script src="/public/static/scripts/addsocialmedialink.js"></script>

</html>
`;
    return raw;
}

module.exports = template;
