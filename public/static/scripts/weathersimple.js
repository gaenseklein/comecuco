async function weatherforecast(){
  let response = await fetch('/public/tiempo.json')
  let datalist
  if(response.ok){
    datalist = await response.json()
  }else{
    console.log('could not fetch');
    return
  }
  let actdate = new Date().getTime()/100000
  //divide by 100000 to save disc space as its always ends with 00000
  let acttemp = ''
  for (var i = 0; i < datalist.length; i++) {
    let dt = datalist[i].time
    if(dt<actdate)acttemp=datalist[i].temp
    else break;
  }
  if(acttemp!=''){
    acttemp+='° '
  }
  let node = document.getElementById('climatext')
  if(node)node.innerText = `LA TEMPERATURA EN MENDOZA ${acttemp} `
}
weatherforecast()
