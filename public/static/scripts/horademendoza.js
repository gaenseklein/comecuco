var horatimer;
function horademendoza(){
  let d = new Date();
  document.getElementById('mendozahora').innerText = 'HORA: '+d.toLocaleTimeString('es',{timeZone:'America/Buenos_Aires'})
  horatimer = setTimeout('horademendoza()',1000)
}

function fechademendoza(){
  let d = new Date();
  d.setTime(d.getTime() - 4 * 60000);
  let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  let dias = ['domingo','lunes', 'martes','miercoles','jueves','viernes','sabado','domingo']
  let dia = dias[d.getUTCDay()]
  let dianum = d.getUTCDate()
  let mes = meses[d.getUTCMonth()]
  let ano = d.getUTCFullYear()
  let result = `${dia} ${dianum} DE ${mes} DE ${ano}`
  return result.toUpperCase()
}

function inithorademendoza(){
  let d = new Date();
  let clima = document.querySelector('div.clima')
  let climatext = document.getElementById('climatext')
  if(!clima || !climatext){
    console.log('no hay div.clima o #climatext');
  }
  let mendozahora = document.createElement('div')
  mendozahora.id='mendozahora'
  clima.insertBefore(mendozahora,climatext)
  let mendozafecha = document.createElement('div')
  mendozafecha.innerText = fechademendoza()
  clima.insertBefore(mendozafecha,mendozahora)
  horademendoza()
}

inithorademendoza()
