module.exports = function(data){
  let x=0;
  let noticiasmenu = ''
  for(x=0;x<data.noticias.length;x++){
    let nfp = data.noticias[x].frontpage ? 'si':'no'
    noticiasmenu+=`<li>
      <a href="/user/noticia/${data.noticias[x]._id}">${data.noticias[x].title}</a>
      <span>${data.noticias[x].tipo}</span>
      <span>${new Date(data.noticias[x].pubdate).toLocaleDateString('es')}</span>
      <span>${nfp}</span>
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
          <li><a href="/user/manualdeestilo">Manual de Uso y Estilo</a></li>
        </ul>
      </div>
    </div>
    <h1 class="bienvenido">Bienvenide ${data.user.name}</h1>
    <!-- dash-board:
  - lista con sus ultimos subidas (noticias)
  - lista de comecuco/trabajos conjuntos
  (- lista de todos ultimos subidas (noticias) )
  - link a subir noticia
  - link a subir nueva columna

  - calendario de destacadas
   -->
    <section class="subirContainer">

      <a href="/user/noticia" title="subir noticia, capitulo de columna y mas">Subir Noticia</a>
      <a href="/user/columna">Empezar Nueva Columna</a>
      <a href="/user/cambia">Editar Presentación del Medio</a>
    </section>
    <div class="noticiasSubidas">
      <h2>Mis últimas noticias subidas</h2>
      <ul>
        <li>
          <span>Título</span>
          <span>Tipo</span>
          <span>Fecha</span>
          <span>Página Principal</span>
        </li>
        ${noticiasmenu}
      </ul>
    </div>
    <div class="listaColumnas">
      <h2>Columnas</h2>
      <ul>
        <li>
          <span>Título</span>
          <span>Nº de Capítulos</span>
          <span>Última subida</span>
        </li>
        ${columnasmenu}
      </ul>
    </div>
    <div class="noticiasComecuco">
      <h2>Noticias de Comecuco</h2>
      <ul>
        <li>
          <span>Título</span>
          <span>Tipo</span>
          <span>Fecha</span>
        </li>
        ${comecucomenu}
      </ul>
    </div>
    <div class="calendariodestacadas">
      <h2>Calendario de Destacadas</h2>
      <ul>
        ${destacadamenu}
      </ul>
    </div>
    <div class="adicional">
      <h2>Operaciones Adicionales</h2>
      <a href="/user/nuevo">Agregar Nuevo Usuario/Medio</a>
      <a href="/user/list">Sobrevista de Usuarios</a>
      <a href="/user/tags">Editar Tags</a>
      <a href="/user/exportAll" download="comecuco.json">Export Database</a>
    </div>
    <div class="publicidades">
    <h2>Publicidades</h2>
        ${publicidades}
        <p>
          <a href="/user/publicidad">Crear Nueva Publicidad</a>
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
