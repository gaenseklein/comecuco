module.exports = function(data){
console.log("data del template",data); // esto se ve en la Terminal del servidor

  let listaaudioplayer = ""
  let audioplayertemplate = ""
    for(x=0;x<data.length;x++){
      if (data[x].mountpoint==="") {
        continue
      } else {
        let audioplayer=data[x];
        console.log("prueba1",audioplayer);
        let audioId=data[x].name;
        let baseSrcComecuco="https://comecuco.org:9000/";
        let radioplayerSrc=baseSrcComecuco+data[x].mountpoint;
        let audioplayertemplate = `
        <audio id="${audioId}" class="radioplayer" src="${radioplayerSrc}" preload="auto"></audio>
        `
        listaaudioplayer+=audioplayertemplate;
        }
    };

  let raw = `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>RADIO Y TV Comunitaria</title>
      <link rel="stylesheet" href="/public/static/layoutappradio.css">
    </head>
    <body class="bodyappradio">
      <div id="relojDeCarga">
       <img id="gifCargando"  src="/public/static/cargando.gif" alt="cargando Radio">
      </div>
      <button id="iniciarApp" onclick="radioapp.radioplayer.play(); this.classList.add('oculta')">Bienvenido. Haga un clic para empezar con el radio</button>
      <div class="contenedorEncabezado">
        <div class="titulo">
          <h1>RADIO & TV COMUNITARIAS</h1>
          <img src="/public/static/AppRadioyTV/LogoRadioyTV.png" alt="Logo Radio y TV Comunitarias">
        </div>
        <div class="red">
          <input type="checkbox" name="verRedes" id="Banda" onclick="radioapp.cambiaRed()">
          <label for="Banda" id="ElegirBanda"><p>&#x1f50d;</p><h4 class="cambiarRed">Cambiar RED</h4><h4 class="aceptarRed">Aceptar</h4>
          </label>
          <img id="tapamodeloradio" src="/public/static/modelo-appradio2blur.jpeg" alt="">

          <input type="radio" class="redes" name="redes" id="COMECUCO" checked>
          <label for="COMECUCO" class="menuredes"><h2>COMECUCO</h2></label>
          <a class="logo" id="logoCOMECUCO" target="_blank" href="https://comecuco.org">
            <img class=""  src="/public/static/logos/comecuco.png" alt="Logo del COMECUCO">
          </a>
          <input type="radio" class="redes" name="redes" id="FARCO">
          <label for="FARCO" class="menuredes"><h2>FARCO</h2></label>
          <img class="logo" id="logoFARCO" src="/public/static/logos/farco.png" alt="Logo de FARCO">

          <input type="radio" class="redes" name="redes" id="RNMA">
          <label for="RNMA" class="menuredes"><h2>RNMA</h2></label>
          <img class="logo" id="logoRNMA" src="/public/static/AppRadioyTV/logoRNMA.png" alt="Logo de la RNMA">

          <input type="radio" class="redes" name="redes" id="AMARC">
          <label for="AMARC" class="menuredes"><h2>AMARC</h2></label>
          <img class="logo" id="logoAMARC" src="/public/static/AppRadioyTV/logoAMARC.jpg" alt="Logo de AMARC">

          <input type="radio" class="redes" name="redes" id="RadiosLibres">
          <label for="RadiosLibres" class="menuredes"><h2>RADIOS LIBRES</h2></label>
          <img class="logo" id="logoRadiosLibres" src="/public/static/AppRadioyTV/logoRadios-libres.png" alt="Logo de Radios Libres">
        </div>
      </div>
     <div class="cajaDial">
        <div id="videopreview">
        ${listaaudioplayer}

          <!--<audio id="radioplayerLaBulla" class="radioplayer" src="https://comecuco.org:9000/radiolabulla" preload="auto"></audio>
          <audio id="radioplayer1" class="radioplayer" src="https://comecuco.org:9000/lamosquitera" preload="auto"></audio>
          <audio id="radioplayer2" class="radioplayer" src="https://comecuco.org:9000/RadiosinDueño" preload="auto"></audio>
          <audio id="radioplayer3" class="radioplayer" src="https://comecuco.org:9000/LaPujante" preload="auto"></audio>
          <audio id="radioplayer4" class="radioplayer" src="https://comecuco.org:9000/TierraCampesina" preload="auto"></audio>
          <audio id="radioplayer5" class="radioplayer" src="https://comecuco.org:9000/Cuyum" preload="auto"></audio>
          <audio id="radioplayer6" class="radioplayer" src="https://comecuco.org:9000/LaLeñera" preload="auto"></audio>-->
          <div id="noHayRadio" class="">&#x26d4;&#xfe0e; <br> Sin señal</div>
          <!--<iframe width="256" height="144" src="https://www.youtube.com/embed/i4rlKGYUPTo" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>-->
        </div>
        <div class="dial">
          <button type="button" name="anterior" class="sintonizador" id="anterior" onclick="radioapp.cambiaRadio(true)">&lt;</button>
          <div class="espectro" id="COMECUCOactivo">

          </div>
          <button type="button" name="posterior" class="sintonizador" id="posterior" onclick="radioapp.cambiaRadio()">&gt;</button>
          <div class="volumen">
           <input id="barra" type="range" min="0" max="1" value="1" step="0.1" oninput="radioapp.cambiaVolumen(this.value)">
           <span id="valor"></span>
          </div>
          <ul id="botoneraDeMemorias">
          <li>
            <button type="button" name="button" id="cargaMemoria" class="testbutton" onclick="radioapp.grabarMemoria()">
              <h6>&#128308;</h6>
            </button>
          </li>
          <li>
            <button type="button" name="button" id="memoriahtml" class="testbutton" onclick="radioapp.playMemoria()">
              <h6 id="memoriaText">Memoria</h6>
            </button>
          </li>
            <li>
              <button type="button" name="button" id="playPause" class="testbutton" onclick="radioapp.paraOsigue()">
                <p id="pause">═</p>
              </button>
            </li>
          </ul>
        </div>
      </div>


      <div class="footer">
      </div>
      <script src="/public/static/scripts/appradio.js">
      </script>
    </body>

  </html>

  `
  // console.log('builded dash-page',raw);
  return raw;
}
