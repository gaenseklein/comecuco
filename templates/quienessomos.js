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
        <a href="${data.medios[x].url}">
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
        <script type="text/javascript">
          function startTime()
          {
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s=today.getSeconds();
        // add a zero in front of numbers<10
            h=checkTime(h);
            m=checkTime(m);
            s=checkTime(s);
            document.getElementById('hora').innerHTML=h+":"+m+":"+s;
            t=setTimeout('startTime()',500);
          }
          function checkTime(i)
          {
            if (i<10)
            {
              i="0" + i;
            }
            return i;
          }
        </script>
      </head>
      <body onload="startTime()" class="subpaginamedio">
        <div class="logo">
          <p class="encabezado"><a href="/">
            COMECUCO</a>
          </p>
          <div class="subtitle">
            somos el colectivo de medios comunitarios de cuyo
          </div>
        </div>
        <div class="clima">
            EL CLIMA EN MENDOZA 13° HORA
            <div id="hora"></div>
        </div>
        <div class="paginamedio">
          <img class="logoredCOMECUCO" src="../public/static/logos/comecuco.png" alt="Logo del COMECUCO">
          <p class="descripcionmedio" id="descripcionCOMECUCO">Somos el Colectivo de Medios
            Comunitarios de Cuyo. Formado en el año 2003, y está ubicada en Las Vegas,
            Potrerillos, a 70 km de la Ciudad de Mendoza. Tenemos una programación muy variada,
            pero siempre buscando aportar a la construcción de la identidad del lugar. Somos
            parte de FARCO (Foro Argentino de Radios Comunitarias) y del CoMeCuCo (Colectivo
            de Medios Comunitarios de Cuyo).</p>
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
          <img src="/public/static/mapaRadioxRadio.png" class="mapaCOMECUCO" alt="Mapa del COMECUCO">
          <ul class="logosIntegrantesCOMECUCO">
          ${medioslist}            
          </ul>
         </div>
        </div>

        <div class="footer">
        </div>
      </body>
      <script src='../public/static/scripts/calecita.js'></script>
    </html>
    `;
    return raw;
}

module.exports = template;
