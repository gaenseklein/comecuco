const template = function(data){
    let fotos = "";
    for(let x=0;x<data.images.length;x++){
        fotos+=`<li>
                <img class="fotosdelmedio" src="/public/static/quienessomos/${data.images[x]}" alt="">
              </li>`;
    }
    fotos.replace('<li>','<li class="activo">');
    let medioslist = ''
    for(let x=0;x<data.medios.length;x++){
      medioslist += `<li>
        <img src="${data.medios[x].icon}" alt="${data.medios[x].name}">
        <a href="/medio/${data.medios[x].url}">
          <h4>${data.medios[x].name}</h4>
        </a>
        <p>${data.medios[x].description}</p>
      </li>`
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Quienes Somos: COMECUCO</title>
        <link rel="stylesheet" href="/public/static/layout.css">
      </head>
      <body class="subpaginamedio">
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
            <li><a href="/">Volver a Inicio</a></li>
          </ul>
        </div>
      </div>
      <div class="clima">
        <span id="climatext">EL CLIMA EN MENDOZA 13°</span>
      </div>
        <div class="paginamedio">
          <img class="logoredCOMECUCO" src="../public/static/logos/comecuco.png" alt="Logo del COMECUCO">
          <p class="descripcionmedio" id="descripcionCOMECUCO">Somos el Colectivo de Medios Comunitarios
          de Cuyo, el COMECUCO. Estamos integrados por radios y televisoras comunitarias de las provincias
          de Mendoza, San Juan y San Luis. <br/> Entendemos a la comunicación como un derecho y luchamos para que
          se ejerza dignamente y con alegría.<br/>
          En las redes somos: <br/>
          https://www.facebook.com/comecuco <br/>
          https://twitter.com/comecucomza</p>
          <div class="fondoblanco"></div>
          <div class="calecita">
            <ul>
              ${fotos}
            </ul>
          </div>
          <div class="datosdelmedio">
            <a href="#">MAIL</a>
          </div>
        </div>
        <div class="titulonoticiasdelmedio">
          <h3>INTEGRANTES DEL COMECUCO</h3>
        </div>
        <div class="integrantesCOMECUCO">
          <iframe class="mapaCOMECUCO" alt="Mapa del COMECUCO" width="100%" height="600px" frameborder="0" allowfullscreen src="//umap.openstreetmap.fr/fr/map/mapa-comecuco_845768?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=false&allowEdit=false&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=null&datalayersControl=false&onLoadPanel=undefined&captionBar=false&fullscreenControl=false&locateControl=false&measureControl=false&editinosmControl=false#7/-33.096/-67.401"></iframe>
          <p class="mapaCompletoCOMECUCO"><a href="//umap.openstreetmap.fr/fr/map/mapa-comecuco_845768" target="_blank">Ver Mapa completo</a></p>
          <ul class="logosIntegrantesCOMECUCO">
          ${medioslist}
          </ul>
         </div>
        </div>

        <div class="footer">
        </div>
      </body>
      <script src='../public/static/scripts/calecita.js'></script>
      <script src='/public/static/scripts/weather.js'></script>
      <script src='/public/static/scripts/horademendoza.js'></script>
    </html>
    `;
    return raw;
}

module.exports = template;
