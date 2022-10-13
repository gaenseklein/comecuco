//simplifyWeather: simple script to build our own custom small weather json from the big json
const fs = require('fs');
try {
  let bigraw = fs.readFileSync('./public/weather.json','utf-8')
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
    let smalltxt = JSON.stringify(small)
    fs.writeFileSync('./public/tiempo.json',smalltxt,'utf-8')
  }
} catch (e) {
  console.log('something went wrong',e);
}
