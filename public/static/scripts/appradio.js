var radioapp={
  redes:[ //contiene todas redes, cada red es un objeto
    {
      nombre: 'comecuco',
      //si miembro tiene un mountpoint se toma base + mountpoint para src del audio
      //si no usa el src directo del miembro:
      base: 'https://comecuco.org:9000/',
      miembros: [
        {tipo: 'radio', nombre: 'la lenera', mountpoint:"lalenera"},
        {tipo: 'radio', nombre: 'radio cuyum', mountpoint:"Cuyum"},
        {tipo: 'radio', nombre: 'radio sin dueno', mountpoint:"RadiosinDueno"},
        {tipo: 'radio', nombre: 'tierra campesina', mountpoint:"TierraCampesina"},
        {tipo: 'video', nombre: 'giramundo tv', youtube:true, src:'https://www.youtube.com/embed/i4rlKGYUPTo'},
      ],
    }, //fin red comecuco
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
  ], //fin lista redes
  redActual: {},
  radioActual: 0,
  radioplayer:null,
  init: function(){
    this.redActual=this.redes[0]
    this.radioplayer=document.getElementById('radioplayer')
    this.cambiaRadioAId(0)
    this.getRedFromComecuco()
  },
  getRedFromComecuco: async function(){
    let resp = await fetch('/app/redes')
    if(resp.ok){
      let red = await resp.json()
      this.redes = red
      this.redActual = this.redes[0]
      this.cambiaRadioAId(0)
    }
    if(location.pathname!='/envivo' && location.pathname!='/envivo/' && location.pathname.substring(0,'/envivo'.length)=='/envivo'){
      let n = location.pathname.substring('/envivo'.length)
      if(n[0]=='/')n=n.substring(1)
      this.buscaRadioPorNombre(n)
    }

  },
  buscaRadioPorNombre: function(nombre){
    let found = false;
    for(let red = 0;red < this.redes.length; red++){
      for(let x=0;x<this.redes[red].miembros.length;x++){
        let m = this.redes[red].miembros[x]
        if(m.nombre==nombre || m.nombre.substring(0,m.nombre.indexOf(' '))==nombre|| m.mountpoint == nombre){
          found=true;
          this.redActual = this.redes[red]
          this.cambiaRadioAId(x)
          // alert('bienvenido al mundo de radios libres.')
          // this.radioplayer.play()
        }
      }
      if(found)break;
    }
  },
  cambiaRadio: function(izquierda){
    if(izquierda)this.radioActual--;
    else this.radioActual++;
    if(this.radioActual>=this.redActual.miembros.length)this.radioActual=0
    if(this.radioActual<0)this.radioActual=this.redActual.miembros.length-1
    this.cambiaRadioAId(this.radioActual)
  },
  cambiaRadioAId: async function(index){
    let miembroact = this.redActual.miembros[index]
    this.radioActual = index
    if(miembroact.tipo=='radio'){
      let videoframe = document.getElementById('videoiframe')
      if(videoframe)videoframe.parentElement.removeChild(videoframe)
      let src=miembroact.src
      if(miembroact.mountpoint)src=this.redActual.base + miembroact.mountpoint
      noHayRadio.classList.remove('nohaysenal')
      this.radioplayer.onerror = function(e){
        console.log('error on radioplayer',e);
        noHayRadio.classList.add('nohaysenal')
      }
      try {
        this.radioplayer.src=src
        this.radioplayer.load()
      } catch (e) {
        noHayRadio.classList.add('nohaysenal')
      }
    }else{
      if(miembroact.tipo=='video'){
        let iframe = document.createElement('iframe');
        iframe.width="256"
        iframe.height="144"
        iframe.id='videoiframe'
        iframe.src=miembroact.src;
        videopreview.appendChild(iframe);
      }
      this.radioplayer.pause()
    }

    COMECUCOactivo.innerHTML=`<h5>${miembroact.nombre}</h5>`
  },
  cambiaRed: function(){
    if(Banda.checked)return;
    let radiobs = document.querySelectorAll('input[name=redes]');
    let radioid;
    for (let x=0;x<radiobs.length;x++){
      if(radiobs[x].checked){
        radioid=radiobs[x].id
        break;
      }
    }
    if(!radioid)return;
    radioid=radioid.toLowerCase()
    for (x=0;x<this.redes.length;x++){
      if(this.redes[x].nombre==radioid){
        this.redActual=this.redes[x]
        break
      }
    }
    this.cambiaRadioAId(0)
  },
  cambiaVolumen: function(volumen){
    this.radioplayer.volume=volumen;
  },
}
radioapp.init();
