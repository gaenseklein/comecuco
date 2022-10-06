module.exports = function(data){
  let x=0;
  let noticiasmenu = ''
  for(x=0;x<data.noticias.length;x++){
    noticiasmenu+=`<li>
      <a href="/user/noticia/${data.noticias[x]._id}">${data.noticias[x].title}</a>
      <span>${data.noticias[x].tipo}</span>
      <span>${new Date(data.noticias[x].pubdate).toLocaleDateString('es')}</span>
    </li>`
  }
  let columnasmenu=''
  for(x=0;x<data.columnas.length;x++){
    let col=data.columnas[x]
    columnasmenu+=`<li>
    <a href="/user/columna/${col._id}">${col.title}</a>
    <span>${col.capitulos.length}</span>
    <span>${new Date(col.lastUpdated).toLocaleDateString('es')}</span>
    </li>`

  }
  let comecucomenu=''
  for(x=0;x<data.conjuntos.length;x++){
    comecucomenu+=`<li>
      <a href="/user/noticia/${data.conjuntos[x]._id}">${data.conjuntos[x].title}</a>
      <span>${data.conjuntos[x].tipo}</span>
      <span>${new Date(data.conjuntos[x].pubdate).toLocaleDateString('es')}</span>
    </li>`
  }

  let destacadamenu=''
  for(x=0;x<6;x++){
    let dest = data.destacadas.destacadas[x]
    let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    let mes = meses[data.destacadas.meses[x]]
    let dcl='';
    if(x<2)dcl='pasado'
    if(x==2)dcl='actual'
    if(dest===undefined || dest.length<1){
      dest='falta de eligir'
      dcl='noeligido'
    }
    let dis =''
    if(x<2)dis='disabled'
    let tmpl=`
    <li class="${dcl}">
    <span class="mes">${mes}</span>
    <span class="tag">${dest}</span>
    <button value="${data.destacadas.meses[x]}" ${dis} onclick="cambiaDestacada(this)" >cambiar</button>
    </li>`
    destacadamenu+=tmpl
  }

  let publicidades = 'no hay publicidades todavia'
  if(data.publicidades && data.publicidades.length>0){
    let publis = ''
    let now = new Date()
    for(x=0;x<data.publicidades.length;x++){
      let p = data.publicidades[x]
      let pinicio = new Date(p.inicio)
      let pfin = new Date(p.fin)
      console.log('p inicio fin',p.inicio,p.fin, pinicio,pfin, now);
      let pimg = ''
      if(p.image)pimg=`<img src="${p.image}">`
      let pclass = ''
      if(pfin>now && pinicio<now)pclass='actual'
      if(pinicio>now)pclass='futuro'
      if(pfin<now)pclass='pasado'
      let iniciostring = new Date(p.inicio).toLocaleDateString('es')
      let finstring = new Date(p.fin).toLocaleDateString('es')
      publis+=`<li class="publicidadwrapper ${pclass}">
      <a class="publicidadelement" href="/user/publicidad/${p._id}">
        <span class="title">${p.descripcion}</span>
        <span class="inicio">${iniciostring}</span>
        <span class="fin">${finstring}</span>
        ${pimg}
      </a>
      </li>`
    }
    publicidades=`<ul>${publis}</ul>`
  }

  let raw = `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Bienvenido</title>
      <link rel="stylesheet" href="/public/static/layout.css">
      <script src="/public/static/scripts/dashboard.js"></script>
    </head>
    <body class="dashboard">
    <div class="menusubusuario">
      <div class="logo" id="logoUsuario">
        <p class="encabezado"><a href="/">
          COMECUCO</a>
        </p>
        <div class="subtitle">
          somos el colectivo de medios comunitarios de cuyo
        </div>
      </div>
      <div class="topMenu" id="topMenuUsuario">
        <ul>
          <li><a href="/iniciar/logout">Cerrar Sesión</a></li>
        </ul>
      </div>
    </div>
    <h1 class="bienvenido">Bienvenido ${data.user.name}</h1>
    <!-- dash-board:
  - lista con sus ultimos subidas (noticias)
  - lista de comecuco/trabajos conjuntos
  (- lista de todos ultimos subidas (noticias) )
  - link a subir noticia
  - link a subir nueva columna

  - calendario de destacadas
   -->
    <section class="subirContainer">

      <a href="/user/noticia" title="subir noticia, capitulo de columna y mas">subir noticia</a>
      <a href="/user/columna">empezar nueva columna</a>
      <a href="/user/cambia">cambiar pagina de medio</a>
    </section>
    <div class="noticiasSubidas">
      <h2>mis ultimas noticias subidas</h2>
      <ul>
        <li>
          <span>titulo</span>
          <span>tipo</span>
          <span>fecha</span>
        </li>
        ${noticiasmenu}
      </ul>
    </div>
    <div class="listaColumnas">
      <h2>Columnas</h2>
      <ul>
        <li>
          <span>titulo</span>
          <span>capitulos total</span>
          <span>ultima subida</span>
        </li>
        ${columnasmenu}
      </ul>
    </div>
    <div class="noticiasComecuco">
      <h2>noticias de Comecuco</h2>
      <ul>
        <li>
          <span>titulo</span>
          <span>tipo</span>
          <span>fecha</span>
        </li>
        ${comecucomenu}
      </ul>
    </div>
    <div class="calendariodestacadas">
      <h2>calendario de destacadas</h2>
      <ul>
        ${destacadamenu}
      </ul>
    </div>
    <div class="adicional">
      <h2>operaciones adicionales</h2>
      <a href="/user/nuevo">nuevo usuario/medio</a>
      <a href="/user/list">sobrevista usuarios</a>
      <a href="/user/tags">editar tags</a>
      <a href="/user/exportAll" download="comecuco.json">export database</a>
    </div>
    <div class="publicidades">
    <h2>publicidades</h2>
        ${publicidades}
        <p>
          <a href="/user/publicidad">crear nueva publicidad</a>
        </p>
    </div>
    <div class="footer">
    </div>
    </body>

  </html>

  `
  // console.log('builded dash-page',raw);
  return raw;
}
