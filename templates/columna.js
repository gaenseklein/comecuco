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
      <h3>Cap ${x}: "${cap.title}"</h3>
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
      <body onload="startTime()" class="subcapitulodecolumna">
        <div class="logo">
          <p class="encabezado"><a href="/">
            COMECUCO</a>
          </p>
          <div class="subtitle">
            somos el colectivo de medios comunitarios de cuyo
          </div>
          <div class="topMenu" id="topMenuUsuario">
            <ul>
              <li><a href="/columnas">Volver</a></li>
            </ul>
          </div>
        </div>
        <div class="clima">
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span> HORA
            <div id="hora"></div>
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
