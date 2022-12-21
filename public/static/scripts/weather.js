async function weatherforecast(){
  let response = await fetch('/public/tiempotodos.json')
  let dataobj
  if(response.ok){
    dataobj = await response.json()
  }else{
    console.log('could not fetch');
    return
  }
  let actdate = new Date().getTime()/100000
  //divide by 100000 to save disc space as its always ends with 00000
  let localidades = ['weather','lasvegas','lavalle','sanjuan','sanluis']
  let names = ['Mendoza','Las Vegas','Lavalle','San Juan','San Luis']
  let node = document.getElementById('climatext')
  if(!node)return
  node.innerHTML=''
  for(let x=0;x<localidades.length;x++){
     let datalist =  dataobj[localidades[x]]
     let name = names[x].toUpperCase()
     let acttemp = ''
     for (var i = 0; i < datalist.length; i++) {
       let dt = datalist[i].time
       if(dt<actdate)acttemp=datalist[i].temp
       else break;
     }
     if(acttemp!=''){
       acttemp+='° '
     }
     let span = document.createElement('span')
     span.innerText = `LA TEMPERATURA EN ${name} ${acttemp} `
     if(x==0)span.classList.add('activo')
     node.appendChild(span)
  }
  weathercarusel()
  // if(node)node.innerText = `EL CLIMA EN MENDOZA ${acttemp} `
}

var weathertimer
function weathercarusel(){
  let spans = document.querySelectorAll('#climatext span')
  for(let x=0;x<spans.length;x++){
      if(spans[x].classList.contains('activo')){
        spans[x].classList.remove('activo')
        if(x<spans.length-1)spans[x+1].classList.add('activo')
        else spans[0].classList.add('activo')
        break
      }
  }
  weathertimer = setTimeout('weathercarusel()',4000)
}
weatherforecast()
