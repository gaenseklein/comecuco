const template = function(data){
    let fotos = "";
    let noticia = data.noticia;
    let fotoprimero = ''
    let fotoprimerourl = ''
    if(noticia.images.length>0){
      fotoprimero = `<img src="${noticia.images[0].url}" alt="${noticia.images[0].title}" class="foto1">
      <p class="textofoto">${noticia.images[0].title}</p>`
      fotoprimerourl=noticia.images[0].url
    }

    let audiosyvideos='';
    for(let x=0;x<noticia.audios.length;x++){
      let adesc = noticia.audios[x].description
      if(!adesc || adesc=='undefined' || adesc.length==0){
        adesc = noticia.audios[x].url
        adesc = adesc.substring(adesc.lastIndexOf('/')+1)
        if(adesc.indexOf('.')>-1)adesc=adesc.substring(0,adesc.lastIndexOf('.'))
      }
      audiosyvideos += `<p class="audiodescription">${adesc}</p>
      <div class="cuadrocontrol">
        <audio src="${noticia.audios[x].url}" controls=""></audio>
        <a href="${noticia.audios[x].url}" download>&#9196;</a>
      </div>`
    }
    if(noticia.videolink && noticia.videolink.iframe && noticia.videolink.iframe.length > 0){
      audiosyvideos+= `<div class="videowrapper">
      <iframe class="" src="${noticia.videolink.iframe}?width%3D640%26amp%3Bheight%3D360%26amp%3Btheme%3Ddark%26amp%3Bautoplay%3D0%26amp%3Bvq%3Dlarge%26amp%3Brel%3D0%26amp%3Bshowinfo%3D1%26amp%3Bmodestbranding%3D1%26amp%3Biv_load_policy%3D1%26amp%3Bcontrols%3D1%26amp%3Bautohide%3D2%26amp%3Bwmode%3Dopaque" allowfullscreen="" width="640" height="360" frameborder="0">
      </iframe>
      </div>
      `
    }
    let imageblock = ''
    if(noticia.images.length>1){
      let images = ''
      for(x=1;x<noticia.images.length;x++){
        images+=`<img src="${noticia.images[x].url}" alt="${noticia.images[x].title}" class="blockfoto">`
      }
      imageblock=`<div class="imageblock">${images}</div>`
    }
    let opengraph = `
    <meta property="og:title" content="${noticia.title}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${fotoprimerourl}" />
    <meta property="og:url" content="https://comecuco.org/noticia/${noticia._id}" />
    `
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>COMECUCO - ${noticia.title}</title>
        <link rel="stylesheet" href="/public/static/layout.css">
        ${opengraph}
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
            <h4 class="subtitulo">${noticia.subtitle}</h4>
            <h3 class="titulopagina">${noticia.title}</h3>
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
            ${imageblock}
        </div>
        <div id="redesSocialesContainer">
        <h4>Comparte en tus redes sociales</h4>
        <div id="redesSocialesWrapper"></div>
        </div>
        <div class="footer">
        </div>
        <script src='/public/static/scripts/weather.js'></script>
        <script src='/public/static/scripts/rssharelink.js'></script>
      </body>
    </html>
    `;
    return raw;
}

module.exports = template;
