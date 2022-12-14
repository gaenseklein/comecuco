const template = function(data){
    let title = data.columna.title || ''
    title = title.toUpperCase()
    let autor = data.columna.author
    let initialdate = new Date(data.columna.pubdate)
    let findate = new Date(data.columna.lastUpdated)
    let inicio = (initialdate.getMonth()+1)+' '+initialdate.getFullYear()
    let fin = (findate.getMonth()+1)+' '+findate.getFullYear()
    let totalcapitulos = data.columna.capitulos.length
    let medioimg = data.medio.icon
    let medioname = data.medio.name
    let capitulos = ''
    let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    let x = 0
    for(x=0;x<data.capitulos.length;x++){
      let cap = data.capitulos[x]
      let img = ''
      let capdate = new Date(cap.pubdate)
      let capday = capdate.getDate()
      let capmonth = meses[capdate.getMonth()]
      let capyear = capdate.getFullYear()
      let capaudios = ''
      for (var i = 0; i < cap.audios.length; i++) {
        let capa = cap.audios[i]
        capaudios+=`<audio src="${capa.url}" controls=""></audio>
        <a href="${capa.url}" type="audio/mpeg;">
        &#9196;</a>`
      }
      if(cap.images.length>0)img = `<img src="${cap.images[0].url}" alt="${cap.images[0].title}">`
      let reproductor = ''
      if(capaudios!='')reproductor = 'class="reproductor"'
      capitulos += `<li>
      ${img}
      <h3>Cap ${x+1}: "${cap.title}"</h3>
      <div class="fechadeemisión">Emitido el ${capday} de ${capmonth} de ${capyear}
      </div>
      <div class="resumen">
      ${cap.resumen}
      </div>
      <div ${reproductor}>
      ${capaudios}
      </div>
      </li>`
    }


    let raw = `<!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Columna COMECUCO</title>
        <link rel="stylesheet" href="/public/static/layout.css">
        <!-- para tener fecha y hora de mendoza -->
        <link rel="canonical" href="https://www.zeitverschiebung.net/es/timezone/america--argentina--mendoza">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      </head>
      <body class="subcapitulodecolumna">
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
            <ul>
              <li><a href="/columnas">Volver</a></li>
            </ul>
          </div>
        </div>
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

        <div class="capitulodecolumna">
          <h1>${title}</h1>
          <ul>
            <div class="producido">Columna producida por: ${autor}
            </div>
            <div class="fechadeemisión">Emitida desde ${inicio} hasta ${fin}
            </div>
            <div class="ndecapítulos">Nº de capítulos: ${totalcapitulos}
            </div>
          </ul>
          <img class="logoautor" src="${medioimg}" alt="${medioname}">
        </div>

        <h2 class="cap">CAPITULOS</h2>

        <div class="listadecapitulos">
          <ul class="capitulo">
            ${capitulos}
          </ul>
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
