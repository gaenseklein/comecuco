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
      nombre: 'radios-libres',
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
    let logoRedActual=document.getElementById('COMECUCO') //ESTO ES PARA INICIAR CON LOGO COMECUCO
    logoRedActual.checked=true;
    this.radioplayer=document.getElementById('radioplayer')
    this.cambiaRadioAId(0)
  },

  simboloDisplayPause: function(){
    let displayPause=document.getElementById('pause');
    displayPause.textContent = "═";
    displayPause.style.transform= "rotate(-90deg)";
  },
  cambiaRadio: function(izquierda){
    document.getElementById('m1Text').classList.remove('enMovimiento1');
    document.getElementById('m2Text').classList.remove('enMovimiento2');
    if(izquierda)this.radioActual--;
    else this.radioActual++;
    if(this.radioActual>=this.redActual.miembros.length)this.radioActual=0
    if(this.radioActual<0)this.radioActual=this.redActual.miembros.length-1
    this.cambiaRadioAId(this.radioActual)
    this.simboloDisplayPause()
  },
  cambiaRadioAId: async function(index){
    let miembroact = this.redActual.miembros[index]
    this.radioActual = index
    if(miembroact.tipo=='radio'){
      let displayplayPause=document.getElementById('playPause');
      displayplayPause.style.display="block";
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
        let displayplayPause=document.getElementById('playPause');
        displayplayPause.style.display="none";
        let iframe = document.createElement('iframe');
        iframe.width="256"
        iframe.height="144"
        iframe.id='videoiframe'
        iframe.src=miembroact.src;
        videopreview.appendChild(iframe);
      }
      this.radioplayer.pause()
      this.simboloDisplayPause()
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

  grabarMemoria: function(mem2){
    let memoria = {
      index: this.radioActual,
      red: this.redActual.nombre,
      radionombre: this.redActual.miembros[this.radioActual].nombre,
    }
    console.log('grabbed mem',memoria,mem2);
    if(mem2){
      this.memoria2 = memoria;
      M2.firstChild.innerText = memoria.radionombre;
      if (document.getElementById('m2Text').classList=="enMovimiento2"){
        return
      }
      this.textoScroll2();
    }else{
      this.memoria1 = memoria
      console.log('saving',M1.firstChild);
      M1.firstChild.innerText = memoria.radionombre;
      if (document.getElementById('m1Text').classList=="enMovimiento1"){
        return
      }
      this.textoScroll()
    }
  },

  espacioX: 0,
  espacioX2: 0,

  textoScroll: function(){
    let textoEnM1=document.getElementById('m1Text');
    if (textoEnM1.innerText.length<=14) {
      textoEnM1.style.textIndent="0ch";
      return
    }
    let cantidadDeCaracteres=(textoEnM1.innerText.length-(textoEnM1.innerText.length*2))*1.5;
    document.getElementById('m1Text').classList.add('enMovimiento1');
    if(this.espacioX>cantidadDeCaracteres) {
      let f=this.espacioX+"ch"
      textoEnM1.style.textIndent=f;
    }
      if (this.espacioX<cantidadDeCaracteres){
        this.espacioX=+10;
      }
     else {this.espacioX=this.espacioX-0.5;
       }
      this.textomovimiento();
  },

  textoScroll2: function(){
    let textoEnM2=document.getElementById('m2Text');
    if (textoEnM2.innerText.length<=14) {
      textoEnM2.style.textIndent="0ch";
      return
    }
   let cantidadDeCaracteres=(textoEnM2.innerText.length-(textoEnM2.innerText.length*2))*1.5;
   document.getElementById('m2Text').classList.add('enMovimiento2');
      if(this.espacioX2>cantidadDeCaracteres) {
        let f=this.espacioX2+"ch"
        textoEnM2.style.textIndent=f;
      }
        if (this.espacioX2<cantidadDeCaracteres){
          this.espacioX2=+10;
        }
       else {this.espacioX2=this.espacioX2-0.5;
         }
        this.textomovimiento2();
  },

  textomovimiento: async function(){
      let espera= await this.sleep(150);
      this.textoScroll()
},

  textomovimiento2: async function(){
      let espera= await this.sleep(150);
      this.textoScroll2()
},

    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },


  playMemoria: function(mem2){
    let memoria = mem2 ? this.memoria2 : this.memoria1
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
}

radioapp.init();
