const template = function(data){
    let lista = ''
    for(let x=0;x<data.length;x++){
      if(!data[x].fullmedio)continue;
      let img = ''
      if(data[x].ultimoCapitulo && data[x].ultimoCapitulo.imagen){
        img=`<img class="fotocolumna" src="${data[x].ultimoCapitulo.imagen}" alt="${data[x].ultimoCapitulo.titulo}">`
      }
      let pd = new Date(data[x].pubdate)
      let lupd = new Date(data[x].lastUpdated)
      let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      let desde = meses[pd.getMonth()]+' '+pd.getFullYear()
      let hasta = meses[lupd.getMonth()]+' '+lupd.getFullYear()
      desde = desde.toLowerCase()
      hasta = hasta.toLowerCase()
      lista+=`<li>
        <div class="contenedorlogo"><a href="/columna/${data[x].url}">${img}</a>
          <img class="logoautor" src="${data[x].fullmedio.icon}" alt="${data[x].fullmedio.name}">
        </div>
        <h3><a href="/columna/${data[x].url}">
          "${data[x].title}"
        </a></h3>
        <div class="producido">Columna producida por: ${data[x].fullmedio.name}
        </div>
        <div class="fechadeemisión">Emitida desde ${desde} hasta ${hasta}
        </div>
        <div class="ndecapítulos">Nº de capítulos: ${data[x].capitulos.length}
        </div>
        <div class="resumen">
          ${data[x].descripcion}
        </div>
      </li>`
    }
    let raw = `
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>COMECUCO: Columnas</title>
        <link rel="stylesheet" href="/public/static/layout.css">
      </head>
      <body class="subtodaslascolumnas">
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
        <div class="clima">
            <span id="climatext">EL CLIMA EN MENDOZA 13°</span>
        </div>
        <div class="todaslascolumnas">
          <ul class="lascolumnas">
            ${lista}
          </ul>
        </div>
        <div class="footer">
        </div>
        <script src='/public/static/scripts/weather.js'></script>
        <script src='/public/static/scripts/horademendoza.js'></script>
      </body>
    </html>

    `;
    return raw;
}

module.exports = template;
