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
    if(pagenr>0 || data.length>=20){
      pager+=`  <div class="pagAntYSig">`
      let sigp = pagenr+1
      let prevp = pagenr-1
      if(pagenr>1)pager+=`<a href="/todaslasnoticias/${prevp}" class="paginaAnterior">« Anterior</a>`
      else if(pagenr==1)pager+=`<a href="/todaslasnoticias" class="paginaAnterior">« Anterior</a>`
      if(data.length>=20)pager+=`<a href="/todaslasnoticias/${sigp}" class="paginaPosterior">Siguiente »</a>`
      pager+=`</div>`
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Noticias COMECUCO</title>
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
      <body onload="startTime()" class="todaslasnoticias">
        <div class="logo">
          <p class="encabezado"><a href="/">
            COMECUCO</a>
          </p>
          <div class="subtitle">
            somos el colectivo de medios comunitarios de cuyo
          </div>
        </div>
        <div class="topMenu">
        </div>
        <div class="clima">
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span> HORA
            <div id="hora"></div>
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
