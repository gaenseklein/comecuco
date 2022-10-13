//simplifyWeather: simple script to build our own custom small weather json from the big json
const fs = require('fs');
try {
  let localidades = ['weather','lasvegas','lavalle','sanjuan','sanluis']
  let resultado = {}
  for(let x=0;x<localidades.length;x++){
    let key=localidades[x]
    let bigraw = fs.readFileSync('./public/'+key+'.json','utf-8')
    let big;
    big = JSON.parse(bigraw)
    if(big){
      let small = []
      for (var i = 0; i < big.properties.timeseries.length; i++) {
        let ts = big.properties.timeseries[i]
        let time = new Date(ts.time).getTime()/100000
        let temp = ts.data.instant.details.air_temperature
        small.push({time:time, temp: temp})
      }
      if(key=='weather'){
        let smalltxt = JSON.stringify(resultado)
        fs.writeFileSync('./public/tiempo.json',smalltxt,'utf-8')
      }
      resultado[key]=small
    }
  }
  if(Object.keys(resultado).length>0){
    let smalltxt = JSON.stringify(resultado)
    fs.writeFileSync('./public/tiempotodos.json',smalltxt,'utf-8')
  }
} catch (e) {
  console.log('something went wrong',e);
}
