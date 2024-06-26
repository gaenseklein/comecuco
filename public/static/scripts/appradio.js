var radioapp={
  redes:[ //contiene todas redes, cada red es un objeto
    {
      nombre: 'comecuco',
      //si miembro tiene un mountpoint se toma base + mountpoint para src del audio
      //si no usa el src directo del miembro:
      base: 'http://comecuco.org:8000/',
      miembros: [
        {tipo: 'radio', nombre: 'La Leñera', mountpoint:"LaLeñera"},
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

  gifCargando: async function(){
    setTimeout(function(){
        relojDeCarga.style.display="none";
      },2000)
  },

  init: function(){
  	if(location.host!='radio.comecuco.org'){
  		location.href = "http://radio.comecuco.org/envivo"
  		return
  	}
    this.redActual=this.redes[0]
    let logoRedActual=document.getElementById('COMECUCO') //ESTO ES PARA INICIAR CON LOGO COMECUCO
    logoRedActual.checked=true;
    //this.radioplayer=document.getElementById('iraLeñera')
    this.cambiaRadioAId(0)
    this.getRedFromComecuco()
  },
  getRedFromComecuco: async function(){
    let resp = await fetch('/app/redes', {
    	method: "GET",
    	mode: "no-cors"
    }) // al empezar en / significa que toma como origen el mismo servidor, osea podria decir comecuco.org
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
          this.radioplayer=document.getElementById(nombre);
          this.radioplayer.play();
          //this.cambiaRadioAId(x)
          // alert('bienvenido al mundo de radios libres.')
          // this.radioplayer.play()
        }
      }
      if(found)break;
    }
  },
  simboloDisplayPause: function(){
    let displayPause=document.getElementById('pause');
    displayPause.textContent = "═";
    displayPause.style.transform= "rotate(-90deg)";
  },
  cambiaRadio: function(izquierda){
    document.getElementById('memoriaText').classList.remove('enMovimiento');
    if(izquierda)this.radioActual--;
    else this.radioActual++;
    if(this.radioActual>=this.redActual.miembros.length)this.radioActual=0
    if(this.radioActual<0)this.radioActual=this.redActual.miembros.length-1
    this.cambiaRadioAId(this.radioActual)
    this.simboloDisplayPause()
    this.scrollTexto('radioTexto',25)
  },

  stopRadioplayers:function(){
    let todosLosRadioplayers= document.getElementsByClassName('radioplayer');
    console.log(todosLosRadioplayers);
    for (var i = 0; i < todosLosRadioplayers.length; i++) {
      cadaRadioplayer=todosLosRadioplayers[i];
      cadaRadioplayer.pause();
    }
  },

  cambiaRadioAId: async function(index){
    this.stopRadioplayers();
    console.log(index);
    let miembroact = this.redActual.miembros[index]
    console.log(miembroact);
    let idRadioActual=miembroact.nombre
    console.log(idRadioActual);
    this.radioplayer=document.getElementById(idRadioActual);
    console.log(this.radioplayer);
    //this.radioActual = index
    if(miembroact.tipo=='radio'){
      let displayplayPause=document.getElementById('playPause');
      displayplayPause.style.display="block";
      let videoframe = document.getElementById('videoiframe')
      if(videoframe)videoframe.parentElement.removeChild(videoframe)
      //let src=miembroact.src
      noHayRadio.classList.remove('nohaysenal');
      if(this.radioplayer.classList.contains('nohaysenal')){
      noHayRadio.classList.add('nohaysenal')}

      try {
        this.radioplayer.play();
        // this.radioplayer.src=src
        // this.radioplayer.load()
      } catch (e) {
        noHayRadio.classList.add('nohaysenal')
      }
    }else{
      if(miembroact.tipo=='video'){
        let displayplayPause=document.getElementById('playPause');
        displayplayPause.style.display="none";
        let iframe = document.createElement('iframe');
        iframe.width="256"
        iframe.height="144"
        iframe.id='videoiframe'
        iframe.src=miembroact.src;
        videopreview.appendChild(iframe);
      }
    //  this.radioplayer.pause()
    }
    this.simboloDisplayPause()
    COMECUCOactivo.innerHTML=`<h5 id="radioTexto">${miembroact.nombre}</h5>`
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
    this.simboloDisplayPause()
  },
  cambiaVolumen: function(volumen){
    this.radioplayer.volume=volumen;
  },

  paraOsigue: function(){
    let displayPause=document.getElementById('pause');
    if (displayPause.textContent=="═") {
      displayPause.textContent = "‣";
      displayPause.style.transform= "none";
      this.radioplayer.pause()
      return
    }
    if(displayPause.textContent=="‣"){
    displayPause.textContent = "═";
    displayPause.style.transform= "rotate(-90deg)";
    this.radioplayer.play()
    }
  },
  grabarMemoria: function(){
    let memoria = {
      index: this.radioActual,
      red: this.redActual.nombre,
      radionombre: this.redActual.miembros[this.radioActual].nombre,
    }
    console.log('grabbed mem',memoria);
    this.memoria = memoria
    memoriahtml.firstElementChild.innerText = memoria.radionombre
    if (document.getElementById('memoriaText').classList=="enMovimiento"){
      return
      }
      this.scrollTexto('memoriaText',12)
  },
  playMemoria: function(){
    let memoria = this.memoria
    if(!memoria)return //no hay memoria todavia
    if(this.redActual.nombre != memoria.red){
      //tenemos que cambiar la red
      let redbotones = document.querySelectorAll('input[name=redes]')
      for(let x=0;x<redbotones.length;x++){
        if(redbotones[x].id.toLowerCase()==memoria.red){
          redbotones[x].checked = true
          break;
        }
      }
      this.cambiaRed()
    }
    this.cambiaRadioAId(memoria.index)
  },
//  espacioX: 0,
/*
  textoScroll: function(mov){
    if (mov){var textoEnMem=document.getElementById('m2Text');
  }else {var textoEnMem=document.getElementById('m1Text')
    }
    if (textoEnMem.innerText.length<=14) {
      textoEnMem.style.textIndent="0ch";
      return
    }
    let cantidadDeCaracteres=(textoEnMem.innerText.length-(textoEnMem.innerText.length*2))*1.5;
    textoEnMem.classList.add('enMovimiento');

    if(this.espacioX>cantidadDeCaracteres) {
      let f=this.espacioX+"ch"
      textoEnMem.style.textIndent=f;
    }
      if (this.espacioX<cantidadDeCaracteres){
        this.espacioX=+10;
      }
     else {this.espacioX=this.espacioX-0.5;
       }
      if (mov){
      this.textomovimiento2();
    }else {
        this.textomovimiento();
      }
  },

  textomovimiento: async function(){
      let espera= await this.sleep(150);
      this.textoScroll(false)
    },

  textomovimiento2: async function(){
      let espera= await this.sleep(150);
      this.textoScroll(true)
  },

  sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  },

  radioScroll: function(){
    var textoRadio=document.getElementById('radioTexto');

    if (textoRadio.innerText.length<=25) {
      textoRadio.style.textIndent="0ch";
      return
    }
    let cantidadDeCaracteres=(textoRadio.innerText.length-(textoRadio.innerText.length*2))*1.5;
    textoRadio.classList.add('enMovimiento');

    if(this.espacioX>cantidadDeCaracteres) {
      let f=this.espacioX+"ch"
      textoRadio.style.textIndent=f;
    }
      if (this.espacioX<cantidadDeCaracteres){
        this.espacioX=+10;
      }
     else {this.espacioX=this.espacioX-0.3;
       }
    this.textoRadioMovimiento();
  },

  textoRadioMovimiento: async function(){
      let espera= await this.sleep(350);
      this.radioScroll()
    },
  */
  scrollTexto: function(idDelElemento, maxletras){
    let textoRadio = document.getElementById(idDelElemento)
    if(!textoRadio){
      console.warn('no encontre elemento con id',idDelElemento)
      return //algo fue mal
    }
    if (textoRadio.innerText.length<=maxletras) {
      //texto no necesita scroll
      textoRadio.style.textIndent="0ch";
      textoRadio.classList.remove('enMovimiento')
      return
    }
    let maximoDistancia=textoRadio.innerText.length*-1 //-1.5 si usas textalign center
    textoRadio.classList.add('enMovimiento');
    if(textoRadio.espacioX==undefined){
      //lo quieremos empezar
      textoRadio.espacioX=maxletras
    }
    if(textoRadio.espacioX < maximoDistancia){
      //lo empezamos de cero
      textoRadio.espacioX = undefined //asi solo tienemos cambiar la linea mas arriba si quieremos otro valor de empieza
    }else{
      //continuamos el scroll
      textoRadio.espacioX=textoRadio.espacioX-0.3
      textoRadio.style.textIndent= textoRadio.espacioX + 'ch'
    }
    setTimeout(function(){
        radioapp.scrollTexto(idDelElemento, maxletras)
      },350)
  },
}

radioapp.gifCargando()
radioapp.init();
