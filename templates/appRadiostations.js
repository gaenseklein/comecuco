module.exports = function(data){
  let medios = data.medios

  let redes = [ //contiene todas redes, cada red es un objeto
    //si miembro tiene un mountpoint se toma base + mountpoint para src del audio
    //si no usa el src directo del miembro:
    {
      nombre: 'farco',
      miembros:[
        {tipo: 'radio', nombre:'farcoradio', src:'ALasBarricadas.mp3'},
        {tipo: 'radio', nombre:'farcoradio 2', src:'ALasBarricadas.mp3'},
      ],
    },
    {
      nombre: 'rnma',
      miembros:[
        {tipo: 'radio', nombre:'rnma-radio 1', src:'radio.farco.org'},
        {tipo: 'radio', nombre:'rnma-radio 2', src:'radio.farco.org'},
      ],
    },
    {
      nombre: 'amarc',
      miembros:[
        {tipo: 'radio', nombre:'amarcradio', src:'radio.farco.org'},
      ],
    },
    {
      nombre: 'radios libres',
      miembros:[
        {tipo: 'radio', nombre:'radios libres', src:'radio.farco.org'},
        {tipo: 'radio', nombre:'radios libres 2', src:'radio.farco.org'},
        {tipo: 'radio', nombre:'radios libres 3', src:'radio.farco.org'},
      ],

    },
  ] //fin lista redes
  let comecuco = {
    nombre: 'comecuco',
    //si miembro tiene un mountpoint se toma base + mountpoint para src del audio
    //si no usa el src directo del miembro:
    base: 'http://comecuco.org:8000/',
    miembros: [
      // {tipo: 'video', nombre: 'giramundo tv', youtube:true, src:'https://www.youtube.com/embed/i4rlKGYUPTo'},
    ],
  } //fin red comecuco
  //giramundo-tv youtube actual
  if(data.giramundo && data.giramundo.videolink){
    comecuco.miembros = [
      {tipo: 'video', nombre: 'giramundo tv', youtube:true, src:data.giramundo.videolink.iframe},
    ]
  }
  //construye miembros
  for(let x=0;x<medios.length;x++){
    if(medios[x].mountpoint){ //si tiene un mounpoint lo agrega a la lista miembros
      comecuco.miembros.unshift({
        tipo:'radio',
        nombre: medios[x].name,
        mountpoint: medios[x].mountpoint
      });
    }
  }
  redes.unshift(comecuco)

  // console.log('builded dash-page',raw);
  let raw = JSON.stringify(redes)
  return raw;
}
