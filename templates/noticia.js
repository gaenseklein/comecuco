const template = function(data){
    let fotos = "";
    let noticia = data.noticia;
    let fotoprimero = ''
    if(noticia.images.length>0){
      fotoprimero = `<img src="${noticia.images[0].url}" alt="${noticia.images[0].title}" class="foto1">
      <p class="textofoto">${noticia.images[0].title}</p>`
    }

    let audiosyvideos='';
    for(let x=0;x<noticia.audios.length;x++){
      audiosyvideos += `<p class="audiodescription">${noticia.audios[x].description}</p>
      <div class="cuadrocontrol">
        <audio src="${noticia.audios[x].url}" controls=""></audio>
        <a href="${noticia.audios[x].url}" download>&#9196;</a>
      </div>`
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Noticia COMECUCO - ${noticia.title}</title>
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

        <div class="lanoticia">
            <h3 class="titulopagina">${noticia.title}</h3>
            <h4 class="subtitulo">${noticia.subtitle}
            </h4>
            <div class="fotonoticia">
              ${fotoprimero}
            </div>
            <img class="logoautor" src="${data.autor.icon}" alt="">
            <div class="autor">Por ${noticia.author}</div>
            <div class="fecha">${new Date(noticia.pubdate).toLocaleDateString('es')}</div><br>
            <div class="contenido">
                ${noticia.body}
            </div>
            <div class="audiosyvideos">
              ${audiosyvideos}
            </div>
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
