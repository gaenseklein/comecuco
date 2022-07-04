const template = function(data){
    let numeroactual = data[0].numero
    let fechaactual = new Date(data[0].pubdate).toLocaleDateString('es')
    let contenidoactual = data[0].body
    let audiosyvideosactual = ''
    console.log(data[0].audios);
    if(data[0].audios && data[0].audios.length>0){
      let inneraudios = ''
      for (var i = 0; i < data[0].audios.length; i++) {
        let src = data[0].audios[i].url
        inneraudios += `<audio src="${src}" controls=""></audio>
        <a href="${src}" type="audio/mpeg;">&#9196;</a>`
      }
      audiosyvideosactual = `<div class="audiosyvideos" id="controlesResumenSemanal">
      <div class="cuadrocontrol">
      ${inneraudios}
      </div>
      </div>`
    }
    let lista = ''
    for(i=1;i<data.length;i++){
      let act = data[i]
      let actfecha = new Date(act.pubdate).toLocaleDateString('es')
      let actaudios = ''
      for(let aa=0;aa<act.audios.length;aa++){
        actaudios+=`<audio src="${act.audios[aa].url}" controls=""></audio>
        <a href="${act.audios[aa].url}" type="audio/mpeg;">&#9196;</a>`
      }
      let actaudio=''
      if(act.audios.length>0)actaudio = `<div class="audiosyvideos" id="controlesResumenSemanal1">
        <div class="cuadrocontrol">
          ${actaudios}
        </div>
      </div>`
      lista += `<li>
        <div class="subpagresumenSemanal">
          <input type="checkbox" id="RSC${act.numero}"name="" value="">
          <label for="RSC${act.numero}"><h4 class="subtitulo">RSC Nº${act.numero} - ${actfecha}</h4></label>
          <div class="contenidoRSC">
            <div class="contenido">
                <p>${act.body}</p>
            </div>
            ${actaudio}
          </div>
        </div>
      </li>`
    }

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Resumen Semanal COMECUCO</title>
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
      <body onload="startTime()" class="unanoticia">
        <div class="logo">
          <p class="encabezado"><a href="/">
            COMECUCO</a>
          </p>
          <div class="subtitle">
            somos el colectivo de medios comunitarios de cuyo
          </div>
        </div>
        <div class="clima">
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span> HORA
            <div id="hora"></div>
        </div>

        <div class="subpagresumenSemanal">
            <img class="logoautor" src="/public/static/logos/comecuco.png" alt="">
            <h1>Resumen Semanal de Noticias del COMECUCO</h1>
            <p class="subtítuloResumenSemanal">Producido por Radios y Televisoras Comunitarias de Cuyo</p>
            <h4 class="subtitulo">Emisión Nº${numeroactual} - ${fechaactual}</h4>
            <p class="contenido">${contenidoactual}</p>
            ${audiosyvideosactual}
        </div>
        <div class="todoslosresumencomecuco">
          <h3 id="buscadorRSC">Archivo del Resumen Semanal:</h3>
          <div class="buscador">
            <form class="buscador" action="/search" method="post">
              <input id="search" type="text" name="txt" value="">
              <input type="submit" id="searchSubmit" name="" value="">
              <label for="searchSubmit">
                <img src="/public/static/lupe.png" alt="search">
              </label>
            </form>
          </div>
          <ul class="resultadobusquedaRSC">
            ${lista}
          </ul>
        </div>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
