const template = function(data){
    //data: {medio, noticias}
    let medio = data.medio
    let noticias = data.noticias
    let archivo = []
    if(data.archivo)archivo=data.archivo.data
    console.log(medio, data.archivo);
    console.log(archivo);
    // console.log(medio,noticias.length,archivo.length)
    let x=0;
    let fotosdelmedio = ''
    for(x=0;x<medio.images.length;x++){
      let clas=''
      if(x==0)clas='class="activo"'
      fotosdelmedio += `<li ${clas}>
      <img class="fotosdelmedio" src="${medio.images[x]}" alt="">
      </li>`
    }
    let mail = ''
    if(medio.publicEmail)mail=`<a href="mailto:${medio.publicEmail}">MAIL</a>`
    let redes = ''
    if(medio.redes && medio.redes.length>0){
      let redlis = ''
      for(x=0;x<medio.redes.length;x++){
        redlis+=`<li><a href="${medio.redes[x].url}">${medio.redes[x].red}</a></li>`
      }
      redes = `
      <div class="listaredes">REDES
      <ul class="navredes">
      ${redlis}
      </ul>
      </div>
      `
    }
    let listanoticias = ''
    if(noticias && noticias.length>0){
      for(x=0;x<noticias.length;x++){
        let notimg = ''
        let notfecha = new Date(noticias[x].pubdate).toLocaleDateString('es')
        if(noticias[x].images && noticias[x].images[0]){
          notimg = `<img src="${noticias[x].images[0].url}" alt="${noticias[x].images[0].title}">`
        }

        listanoticias+=`<li>
        ${notimg}
        <h3><a href="/noticia/${noticias[x]._id}">
        ${noticias[x].title}
        </a></h3>
        <div class="fecha">
        ${notfecha}
        </div>
        </li>`
      }
    }
    let listaarchivo = ''
    let linkalarchivo = ''
    console.log('archivo?',archivo);
    if(archivo && archivo.length>0){
      linkalarchivo='<a href="/archivo/medio/'+medio.drupalid+'">ver al archivo</a>'
      console.log('archivo found');
      for(x=0;x<archivo.length;x++){
        let notimg = ''
        let notfecha = new Date(archivo[x].pubdate).toLocaleDateString('es')
        if(archivo[x].images && archivo[x].images[0]){
          notimg = `<img src="${archivo[x].images[0].url}" alt="${archivo[x].images[0].title}">`
        }

        listaarchivo+=`<li>
        ${notimg}
        <h3><a href="/node/${archivo[x]._id}">
        ${archivo[x].title}
        </a></h3>
        <div class="fecha">
        ${notfecha}
        </div>
        </li>`
      }
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>${medio.name}</title>
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
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span> HORA
            <div id="hora"></div>
        </div>
        <div class="paginamedio">
          <img class="logomedio" src="${medio.icon}" alt="Logo ${medio.name}">
          <h1 class="nombremedio">${medio.name}</h1>
          <p class="descripcionmedio">
            ${medio.description}
          </p>
          <div class="fondoblanco"></div>
          <div class="calecita">
            <ul>
              ${fotosdelmedio}
            </ul>
          </div>
          <div class="datosdelmedio">
            <a href="/envivo/${medio.mountpoint}">RADIO ONLINE</a>
            <a href="#">MAPA</a>
            ${mail}
            ${redes}
          </div>
        </div>
        <div class="titulonoticiasdelmedio">
          <h3>NOTICIAS DE ${medio.name}</h3>
        </div>

        <div class="noticiasdelmedio">
          <ul>
            ${listanoticias}
            ${listaarchivo}
          </ul>
        </div>
        <div id="veralarchivo">
          ${linkalarchivo}
        </div>

        <div class="footer">
        </div>
      </body>
      <script src='/public/static/scripts/calecita.js'></script>
      <script src='/public/static/scripts/weather.js'></script>
    </html>

    `;
    return raw;
}

module.exports = template;
