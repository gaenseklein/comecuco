const template = function(data){
raw = `
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Manual de Estilo</title>
    <link rel="stylesheet" href="/public/static/layout.css">

  </head>
  <body class="subpagusuario">
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
          <li><a href="/user">Volver</a></li>
        </ul>
      </div>
    </div>

    <div class="ManualDeEstilo">
      <img class="logocomecuco" src="/public/static/logos/comecuco.png" alt="Logo del COMECUCO">
      <h1>MANUAL DE USO y ESTILO DE COMECUCO.ORG</h1>
      <p>Estos son algunos acuerdos y propuestas para mejorar el uso y estilo de la página</p>
      <h2>PUBLICACIÓN</h2>
      <ul>
        <li>Publicar como mínimo 3 veces a la semana.</li>
        <li>Publicar como máximo 1 entrada por día en la página principal, y todas las que queramos en la pestaña propia (para evitar que en la principal no quede diverso)</li>
        <li>Publicar con la fecha real de la entrevista o reporte (y no con la fecha de cuando se sube a la página). Eso se puede hacer modificando la fecha de la noticia al cargarla.</li>
        <li>Si hay notas provinciales (o nacionales) con la misma temática ya publicada, no crear otra entrada (que va a quedar similar) sino pedir al otr@ que abra y publique como COMECUCO (modificar autoría) para ampliar la noticia y meterle nuevos audios, así queda como provincial.</li>
      </ul>
      <h2>TITULACION</h2>
      <ul>
        <li>El título va en minúsculas (excepto la primer letra y los nombres propios, obvio). No va en MAYÚSCULAS.</li>
        <li>El título no lleva el nombre del entrevistado, a no ser que el propio entrevistado sea la noticia o sea muy relevante.</li>
        <li>El titulo tiene que ser preferentemente corto.</li>
      </ul>
      <h2>AUDIOS</h2>
      <ul>
        <li>Intentar realizar cortes de audio y no subir el choclazo de la entrevista entera, al menos cuando se pueda, y rotular bien de qué habla el corte.</li>
        <li>Con respecto a la denominación del archivo de audio para subir (que luego puede ser bajado por quien quiera) proponemos esta nomenclatura: nombre del entrevistado – tema de las entrevista – fecha de la entrevista. Ejemplo: Juan Perez Paro Docente 25 ago 2017.mp3</li>
        <li>Las publicaciones que subamos como COMECUCO, agregar a los audios algún copete del colectivo (podría hacerse con cada medio también). Hay que armar un copete general para que todos podamos
pegarlo al principio.</li>
        <li>Ver el tema de repositorio de toda la artística.</li>
      </ul>
      <h2>IMAGENES</h2>
      <ul>
        <li>Con respecto a las imágenes quedó abierto el debate, pero sugerirmos en este orden: usar fotos propias, usar fotos con creative commons, usar otras fotos, usar de medios hegemónicos (el desafío sería no usar). Si es posible citar la fuente o autoría de las fotos.</li>
      </ul>
      <h2>STREAMING</h2>
      <ul>
        <li>Para ver que audiencia hay actualmente se puede usar la página del streaming: https://comecuco.org:9000</li>
      </ul>
      <h2>ETIQUETAS (TAGS)</h2>
      <ul>
        <li>ETIQUETAS PRINCIPALES: cada nota deberá tener al menos una de ellas. Por ejemplo AGUA. Son como los temas principales.</li>
          <ul class="tablaTags">
            <li>Tierra</li>
            <li>Agua</li>
            <li>Jóvenes</li>
            <li>Vivienda</li>
            <li>Bienes comunes</li>
            <li>Organización Popular</li>
            <li>Género</li>
            <li>Campesinado</li>
            <li>Educación</li>
            <li>Trabajo</li>
            <li>Diversidad</li>
            <li>Comunicación Popular</li>
            <li>DDHH</li>
            <li>Pueblos Originarios</li>
            <li>Salud</li>
            <li>Mujeres</li>
            <li>Economía</li>
            <li>Gremios</li>
            <li>Niñez</li>
            <li>Cultura</li>
            <li>Economía Popular</li>
            <li>Discapacidad</li>
            <li>Municipio</li>
            <li>Política</li>
            <li>Adultos Mayores</li>
          </ul>
        <li>ETIQUETAS ESPECIFICAS de la nota: Facilitan la búsqueda por temáticas puntuales de la noticia. Por ejemplo PORTEZUELO DEL VIENTO</li>
        <li>ETIQUETA MENSUAL: cada vez que se la ponemos a una nota, va a la sección NUESTRAS DESTACADAS de ese mes. Por ejemplo en marzo podría ser MEMORIA, entonces todas la notas vinculadas a ese mes, irán ahí.</li>
        <ul class="tablaTags">
          <li>Enero: </li>
          <li>Febrero: EDUCACIÓN</li>
          <li>Marzo: MEMORIA</li>
          <li>Abril: LUCHA CAMPESINA</li>
          <li>Mayo: TRABAJADORXS/TRABAJO</li>
          <li>Junio: </li>
          <li>Julio: </li>
          <li>Agosto: PACHAMAMA</li>
          <li>Septiembre: </li>
          <li>Octubre: DIVERSIDAD CULTURAL</li>
          <li>Noviembre: MUJERES/GÉNERO</li>
          <li>Diciembre: AGUA</li>
        </ul>
      </ul>
    </div>

    <div class="footer">
    </div>
  </body>
</html>
`

return raw;
}

module.exports = template;
