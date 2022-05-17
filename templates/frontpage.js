const template = function(data){
    let loMasLeido = "";
    let x=0;
    const calecitaLength=5
    const maxColumnas=5
    for(x=0;x<data.masleidos.length;x++){
      let ml = data.masleidos[x];
      let mlimg = '';
      if(ml.images[0])mlimg=`<img src="${ml.images[0].url}" alt="${ml.images[0].title}">`
      let mlfecha = ml.pubdate.toLocaleDateString('es')
      //mas leidos:
      loMasLeido+= `
      <li>
        <a href="/noticia/${ml._id}">
          ${mlimg}
          <div class="title">
              ${ml.title}
          </div>
          <div class="fecha">
            ${mlfecha}
          </div>
        </a>
      </li>
      `;
      //calecita:
      let calecita = ''
      for(x=0;x<calecitaLength;x++){
        let ce = data.articulos[x]
        let cltactivo=''
        if(x==0)cltactivo='class="activo"'
        let pimage = '';
        if(ce.images.length>0)pimage = `<img class="caruselpreviewimage" src="${ce.images[0].url}" alt="${ce.images[0].title}">`
        let pactivosstring=''
        for(pa=0;pa<calecitaLength;pa++){
          let pactivo=''
          if(pa==x)pactivo='activo'
          pactivostring+=`<div class="puntito ${pactivo}"></div>`
        }


        let clt=`<li ${ctlactivo}>
          <div class="subtitle">
                ${ce.subtitle}
          </div>
          <h3>
            <a href="noticia/${ce._id}">${ce.title}</a>
          </h3>
          <div class="autor">
               Por ${ce.author}
          </div>
          <a href="noticia/${ce._id}">${pimage}</a>
          <div class="puntitos">
            ${pactivosstring}
          </div>
        </li>`
        calecita+=clt
      }
    }
    //medios menu: data.medios
    let mediosmenu = ''
    for(x=0;x<data.medios.length;x++){

      let mediosmenutemplate = `
      <li>
      <a href="/medio/${data.medios[x].url}">
      <img src="${data.medios[x].icon}" alt="${data.medios[x].name}">
      </a>
      </li>
      `
      mediosmenu+=mediosmenutemplate;
    }
    //menu destacadas: data.destacadas (tipo noticia)
    let destacadasmenu=''
    for(x=0;x<data.destacadas.length;x++){
      let dimg = ''
      let dest=data.destacadas[x]
      if(dest.images.length>0)dimg=`<img src="${dest.images[0].url}" alt="${dest.images[0].title}">`
      let destacadatemplate=`<li>
      ${dimg}
      <h3><a href="/noticia/${dest._id}">
      ${dest.title}
      </a></h3>
      <div class="resumen">
      ${dest.resumen}
      </div>
      <div class="tag">
      ${dest.tags.join(' ')}
      </div>
      </li>`
      destacadasmenu+=destacadatemplate
      //columnas: data.columnas - tipo columna
      let columnamenu = ''
      for(x=0;x<maxColumnas && x<data.columnas.length;x++){

        let columnatemplate = `<li>
        <a href="/columna/${data.columnas[x].url}">
        <h3>${data.columnas[x].title}</h3>
        <img src="${data.columnas[x].ultimoCapitulo.imagen}" alt="${data.columnas[x].ultimoCapitulo.titulo}">
        </a>
        </li>`
        columnamenu+=columnatemplate
      }
    }
    //produccionesColectivas: data.colectivas
    let pcolectivasmenu=''
    for(x=0;x<2;x++){
      let ptipo = 'VIDEO'
      if(data.colectivas[x].audios.length>0)ptipo='AUDIO'
      let pcolectivastemplate = `<li>
      <img src="${data.colectivas[x].images[0].url}" alt="${data.colectivas[x].images[0].title}">
      <h3>${ptipo}</h3>
      <h3 class="titulocolectiva"><a href="/noticia/${data.colectivas[x]._id}">${data.colectivas[x].title}</a></h3>
      </li>`
      pcolectivasmenu+=pcolectivastemplate
    }

    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>COMECUCO</title>
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
      <body onload="startTime()">
        <div class="logo">
          <h1>
            COMECUCO
          </h1>
          <div class="subtitle">
            somos el colectivo de medios comunitarios de cuyo
          </div>
        </div>
        <div class="topMenu">
            <ul>
              <li><a href="todaslasnoticias.html">Todas las noticias</a></li>
              <li><a href="quienessomos.html">Quienes Somos</a></li>
            </ul>
        </div>
        <div class="clima">
            EL CLIMA EN MENDOZA 13° HORA
            <div id="hora"></div>
        </div>
        <div class="buscador">
          <form class="buscador" action="/search" method="post">
            <input id="search" type="text" name="txt" value="">
            <input type="submit" id="searchSubmit" name="" value="">
            <label for="searchSubmit">
              <img src="lupe.png" alt="search">
            </label>
          </form>
        </div>
        <div class="loMasLeido">
          <h2>LO MAS LEIDO</h2>
          <ul>
            ${loMasLeido}
          </ul>
        </div>
        <div class="calecita">
          <ul>
            ${calecita}
          </ul>
        </div>
        <div class="blockRight mediosEnVivo">
          <h2>MEDIOS EN VIVO</h2>
          <ul>
            <li class="activo">
              <audio src="http://comecuco.org:8000/stream" controls="">
              </audio>
              <!-- https://unicode-table.com -->
              <button class="playbutton">▶</button>
              <div class="nombre">
                La Pujante fm 93.3
              </div>
            </li>
          </ul>
          <button class="arrowLeft">❮</button>
          <button class="arrowRight">❯</button>
        </div>
        <div class="blockRight video">
          <a href="#" class="videolink">
            <img src="giramundopreview.png" alt="">
            <div class="duration">
                29:10
            </div>
          </a>
        </div>
        <div class="blockRight resumenSemanal">
          <a href="/resumensemanal"><h2>RESUMEN SEMANAL COMECUCO</h2></a>
          <img class="logoResumen" src="/public/static/resumensemanal.gif" alt="">
        </div>
        <div class="mediosMenu">
          <h2>MEDIOS</h2>
          <ul>
            ${mediosmenu}
          </ul>
        </div>
        <div class="destacadas">
          <h2>NUESTRAS DESTACADAS</h2>
          <ul class="destacadas-list">
            ${destacadasmenu}
          </ul>
          </div>
          <div class="actualidad">
          <ul class="grandes">
            <li>
              <img src="${data.articulos[calecitaLength+0].images[0].url}" alt="${data.articulos[calecitaLength+0].images[0].title}">
              <h3><a href="noticia/${data.articulos[calecitaLength+0]._id}">
                ${data.articulos[calecitaLength+0].title}
              </a></h3>
              <div class="resumen">
                ${data.articulos[calecitaLength+0].resumen}
              </div>
            </li>
            <li>
              <img src="${data.articulos[calecitaLength+1].images[0].url}" alt="${data.articulos[calecitaLength+1].images[0].title}">
              <h3><a href="noticia/${data.articulos[calecitaLength+1]._id}">
                ${data.articulos[calecitaLength+1].title}
              </a></h3>
              <div class="resumen">
                ${data.articulos[calecitaLength+1].resumen}
              </div>
            </li>

          </ul>
          <ul class="chiquitas">
            <li>
              <img src="${data.articulos[calecitaLength+2].images[0].url}" alt="${data.articulos[calecitaLength+2].images[0].title}">
              <h3><a href="noticia/${data.articulos[calecitaLength+2]._id}">
                ${data.articulos[calecitaLength+2].title}
              </a></h3>
              <div class="fecha">
                ${new Date(data.articulos[calecitaLength+2].pubdate).toLocaleDateString('es')}
              </div>
            </li>
            <li>
              <img src="${data.articulos[calecitaLength+3].images[0].url}" alt="${data.articulos[calecitaLength+3].images[0].title}">
              <h3><a href="noticia/${data.articulos[calecitaLength+3]._id}">
                ${data.articulos[calecitaLength+3].title}
              </a></h3>
              <div class="fecha">
                ${new Date(data.articulos[calecitaLength+3].pubdate).toLocaleDateString('es')}
              </div>
            </li>
            <li>
              <img src="${data.articulos[calecitaLength+4].images[0].url}" alt="${data.articulos[calecitaLength+4].images[0].title}">
              <h3><a href="noticia/${data.articulos[calecitaLength+4]._id}">
                ${data.articulos[calecitaLength+4].title}
              </a></h3>
              <div class="fecha">
                ${new Date(data.articulos[calecitaLength+4].pubdate).toLocaleDateString('es')}
              </div>
            </li>
          </ul>
        </div>
        <div class="produccionesColectivas">
          <h2>PRODUCCIONES COLECTIVAS</h2>
          <!-- entra video o audio al elemento -->
          <ul>
            ${pcolectivasmenu}
          </ul>
          <a href="/produccionescolectivas">
            <h3>Ver más Producciones Colectivas</h3>
          </a>
        </div>
        <div class="columnas">
          <!--
          frontpage: link a columna-subpagina o ultima entrada de columnas
            que esta compartido entre la red de comecuco
          subpagina: sobrevista sobre todas las columnas con link a columna-subpagina
          columna-subpagina: todas las subidas/capitulos de esta columna

          por ejemplo:
          frontpage: medios-ambiental y deporte
          subpagina: medios-ambiental, deporte, feminismo y cocinar
          columna-subpagina de medios-ambiental: capitulo 11, capitulo 10, capitulo 9...
        -->
          <h2>COLUMNAS</h2>
          <div class="columnas-wrapper vertical-scroll" id="cajacolumna">
            <button class="scrollbutton izquierda" onclick="scrollList(this)">«</button>
            <div class="columnas-ul-wrapper vertical-scroll-wrapper">
              <ul>
                ${columnamenu}
                <li class="ultimoli">
                  <a href="todaslascolumnas.html" class="finalscroll">
                    <h3>Ver todas las Columnas</h3>
                  </a>
                </li>
              </ul>
            </div>
            <button class="scrollbutton derecha" onclick="scrollList(this)">»</button>
            <div id="cajacolumnahija">
            </div>
          </div>
        </div>
        <div class="footer">

        </div>
      </body>
      <script type="text/javascript">
        var calecitaactivo=0;
        var calecitatiempo=3000;
        var calecitatimer;
        function calecita(){
          let lis = document.querySelectorAll('.calecita li');
          let oldli=document.querySelector('.calecita li.activo');
          if(oldli)oldli.classList.remove('activo');
          if(lis[calecitaactivo])lis[calecitaactivo].classList.add('activo');
          calecitaactivo++;
          if(calecitaactivo>3)calecitaactivo=0;
          calecitatimer=setTimeout(calecita, calecitatiempo);
        }
        calecita();
      </script>
      <script src='/public/static/scripts/mediosenvivo.js'></script>
      <script src='/public/static/scripts/playbutton.js'></script>
      <script src='/public/static/scripts/verticalscrolllist.js'></script>
    </html>
    `;
    return raw;
}

module.exports = template;
