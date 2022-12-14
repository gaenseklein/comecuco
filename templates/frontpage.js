const template = function(data){
    let loMasLeido = "";
    let x=0;
    const calecitaLength=5
    const maxColumnas=5
    //anadir imagen por defecto a todos datos sin imagen
    for(x=0;x<data.articulos.length;x++){
        if(!data.articulos[x].images || data.articulos[x].images.length==0){
          data.articulos[x].images = [{
            url: '/public/static/logos/comecuco.png',
            title: 'imagen de defecto'
          }]
        }
    }
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
    }
    //calecita:
    let calecita = ''
    for(x=0;x<calecitaLength && x<data.articulos.length;x++){
      let ce = data.articulos[x]
      let cltactivo=''
      if(x==0)cltactivo='class="activo"'
      let pimage = '';
      if(ce.images.length>0)pimage = `<img class="caruselpreviewimage" src="${ce.images[0].url}" alt="${ce.images[0].title}">`
      let pactivosstring=''
      for(pa=0;pa<calecitaLength;pa++){
        let pactivo=''
        if(pa==x)pactivo='activo'
        pactivosstring+=`<div class="puntito ${pactivo}"></div>`
      }
      let cesubtitle = ce.subtitle || '&nbsp;'

      let clt=`<li ${cltactivo}>
      <div class="subtitle">
      ${cesubtitle}
      </div>
      <h3>
      <a href="noticia/${ce._id}">${ce.title}</a>
      </h3>
      <div class="autor">
      Por ${ce.author}
      </div>
      <a href="noticia/${ce._id}">${pimage}</a>
      <div class="puntitos">
      <button class="boton izquierda" onclick="calecitacontrol(false)">«</button>
      ${pactivosstring}
      <button class="boton derecha" onclick="calecitacontrol(true)">»</button>
      </div>
      </li>`
      calecita+=clt
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
      let resumen = dest.resumen;
      if(!resumen){
        let espaciopos=dest.body.indexOf(' ',15);
        if(espaciopos>-1)resumen=dest.body.substring(0,espaciopos);
        else resumen=dest.body.substring(0,15)
        resumen+='...'
      }
      let destacadatemplate=`<li>
      ${dimg}
      <h3><a href="/noticia/${dest._id}">
      ${dest.title}
      </a></h3>
      <div class="resumen">
      ${resumen}
      </div>
      <div class="tag">
      ${dest.tags.join(' ')}
      </div>
      </li>`
      destacadasmenu+=destacadatemplate
    }
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
    //produccionesColectivas: data.colectivas
    let pcolectivasmenu=''
    for(x=0;x<2 && x<data.colectivas.length;x++){
      let ptipo = 'VIDEO'
      if(data.colectivas[x].audios.length>0)ptipo='AUDIO'
      let pcolectivastemplate = `<li>
      <img src="${data.colectivas[x].images[0].url}" alt="${data.colectivas[x].images[0].title}">
      <h3>${ptipo}</h3>
      <h3 class="titulocolectiva"><a href="/noticia/${data.colectivas[x]._id}">${data.colectivas[x].title}</a></h3>
      </li>`
      pcolectivasmenu+=pcolectivastemplate
    }
    //2 grandes: solo si hay bastante articulos
    let grandesmenu = ''
    if(data.articulos.length>calecitaLength+1)grandesmenu=`<li>
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
    </li>`
    //4 chiquitas: solo si hay bastante articulos
    let chiquitasmenu = ''
    if(data.articulos.length>calecitaLength+4){
      chiquitasmenu = `<li>
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
      </li>`
    }

    let publicidades = ["", ""]
    console.log('hay publicidad',data.publicidades);
    if(data.publicidades && data.publicidades.length>0){
      //let publis = ''
      for(x=0;x<data.publicidades.length;x++){
        let p = data.publicidades[x]
        if(!p.image)continue
        let phtml =`<img class="publiGobNacional" src="${p.image}" alt="${p.descripcion}">`
        if(p.url){
          phtml = `<a href="${p.url}">`+phtml+'</a>'
        }
        //publis+=phtml
        publicidades[x]=phtml
      }
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
              <li><a href="/todaslasnoticias">Todas las noticias</a></li>
              <li><a href="/quienessomos">Quienes Somos</a></li>
            </ul>
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
        <div class="loMasLeido">
        <div class="banner">
        ${publicidades[1]}
        </div>
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
        <div class="banner">
          ${publicidades[0]}
        </div>
        <div class="cajaBlockRight">
          <div class="blockRight mediosEnVivo">
            <h2>MEDIOS EN VIVO</h2>
            <div class="miniApp">
              <img src="/public/static/modelo-appradioTV.png" alt="Reproductor Radios Comunitarias" class="imgMiniApp">
              <a class="playbutton" href="/envivo" target="_blank">▶</a>
            </div>
          </div>
          <div class="blockRight resumenSemanal">
            <h2>RESUMEN SEMANAL COMECUCO</h2>
            <a href="/resumensemanal">
              <img class="logoResumen" src="/public/static/resumensemanal.gif" alt="Logo COMECUCO">
            </a>
          </div>
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
            ${grandesmenu}

          </ul>
          <ul class="chiquitas">
            ${chiquitasmenu}
          </ul>
          <a href="/todaslasnoticias" class="verNoticias">
            <h3>Ver todas las Noticias</h3>
          </a>
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
                  <a href="/columnas" class="finalscroll">
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
          if(calecitaactivo>=lis.length)calecitaactivo=0;
          calecitatimer=setTimeout(calecita, calecitatiempo);
        }
        calecita();

        function calecitacontrol(right){
          clearTimeout(calecitatimer);
          let lis = document.querySelectorAll('.calecita li');
          let oldli=document.querySelector('.calecita li.activo');
          if (right){var valorlisNew=calecitaactivo+1;
              if(valorlisNew>=lis.length)valorlisNew=0;
          }else {var valorlisNew=calecitaactivo-1;
              if(valorlisNew<0)valorlisNew=lis.length-1;
            };
          if(oldli)oldli.classList.remove('activo');
          if(lis[valorlisNew])lis[valorlisNew].classList.add('activo');
          calecitaactivo=valorlisNew;
          calecitatimer=setTimeout(calecita, 5000);
        }
      </script>

      <!-- <script src='/public/static/scripts/calecita.js'></script>
      <script src='/public/static/scripts/playbutton.js'></script>  -->
      <script src='/public/static/scripts/verticalscrolllist.js'></script>
      <script src='/public/static/scripts/weather.js'></script>
    </html>
    `;
    return raw;
}

module.exports = template;
