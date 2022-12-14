const template = function(notes){
    let data = notes.data
    let pagenr = notes.pagenr || 0
    pagenr = pagenr*1
    let lista = ''
    for(let x=0;x<data.length;x++){
      let noticia = data[x]
      let img = ''
      let fecha = new Date(noticia.pubdate).toLocaleDateString('es')
      let resumen = noticia.resumen
      if(!resumen || resumen.length==0)resumen = noticia.body.substring(0,noticia.body.indexOf(' ',200))+'...'
      if(noticia.images[0]){
        img = `<img src="${noticia.images[0].url}" alt="${noticia.images[0].title}">`
      }
      lista+=`  <li>
            ${img}
          <h3><a href="/noticia/${noticia._id}">
            ${noticia.title}
          </a></h3>
          <div class="fecha">${fecha}
            <div class="autor">
            Por ${noticia.author}
            </div>
          </div>
          <div class="resumen">
            ${resumen}
          </div>
        </li>
      `
    }
    let pager = ''
      pager+=`  <div class="pagAntYSig">`
      let sigp = pagenr+1
      let prevp = pagenr-1
      if(pagenr>1)pager+=`<a href="/todaslasnoticias/${prevp}" class="paginaAnterior">« Anterior</a>`
      else if(pagenr==1)pager+=`<a href="/todaslasnoticias" class="paginaAnterior">« Anterior</a>`
      if(data.length>=20)pager+=`<a href="/todaslasnoticias/${sigp}" class="paginaPosterior">Siguiente »</a>`
      else if(!data.archivo)pager+=`<a href="/archivo" class="paginaPosterior">Ver mas en el Archivo</a>`
      pager+=`</div>`

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Noticias COMECUCO</title>
        <link rel="stylesheet" href="/public/static/layout.css">
        <!-- para tener fecha y hora de mendoza -->
        <link rel="canonical" href="https://www.zeitverschiebung.net/es/timezone/america--argentina--mendoza">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      </head>
      <body class="todaslasnoticias">
        <div class="menusubusuario">
          <div id="logoUsuario" class="logo">
            <p class="encabezado"><a href="/">
              COMECUCO</a>
            </p>
            <div class="subtitle">
              somos el colectivo de medios comunitarios de cuyo
            </div>
          </div>
          <div class="topMenu" id="topMenuUsuario">
            <ul>
              <li><a href="/">Ir a Inicio</a></li>
            </ul>
          </div>
        </div>
        <div id="climaTodasLasNoticias">
          <div class="clima">
            <div>
              <div class="clock small" id="clock">
                <div class="date"></div>
                <div class="time">
                  <span class="hour"></span>:
                  <span class="minute"></span>:
                  <span class="second"></span>
                </div>
              </div>
              <script type="text/javascript"> $(document).ready(function() { $("div#clock").simpleClock(-3); }); (function ($) { $.fn.simpleClock = function ( utc_offset ) { var language = "es"; switch (language) { default: var weekdays = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]; var months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]; break; } var clock = this; function getTime() { var date = new Date(); var nowUTC = date.getTime() + date.getTimezoneOffset()*60*1000; date.setTime( nowUTC + (utc_offset*60*60*1000) ); var hour = date.getHours(); return { day: weekdays[date.getDay()], date: date.getDate(), month: months[date.getMonth()], year: date.getFullYear(), hour: appendZero(hour), minute: appendZero(date.getMinutes()), second: appendZero(date.getSeconds()) }; } function appendZero(num) { if (num < 10) { return "0" + num; } return num; } function refreshTime(clock_id) { var now = getTime(); clock = $.find('#'+clock_id); $(clock).find('.date').html(now.day + ' ' + now.date + ' DE ' + now.month + ' DE ' + now.year); $(clock).find('.time').html('HORA: ' + "<span class='hour'>" + now.hour + "</span>:<span class='minute'>" + now.minute + "</span>:<span class='second'>" + now.second + "</span>"); if ( typeof(suffix) != "undefined") { $(clock).find('.time').append('<strong>'+ suffix +'</strong>'); } } var clock_id = $(this).attr('id'); refreshTime(clock_id); setInterval( function() { refreshTime(clock_id) }, 1000); }; })(jQuery); </script>
            </div>
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span>
          </div>
          <div class="buscador">
            <form class="buscador" action="/search" method="post">
              <input id="search" type="text" name="txt" value="">
              <input type="submit" id="searchSubmit" name="" value="">
              <label for="searchSubmit">
                <img src="/public/static/lupe.png" alt="search">
              </label>
            </form>
          </div>
        </div>
        <div class="noticiasúltimas">
          <ul class="últimas">
          ${lista}
          </ul>
          ${pager}
        </div>

        <div class="footer">
        </div>
        <script src='/public/static/scripts/weather.js'></script>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
