function cleanurl(input, output,aditional){
  let cars = ', ;/=?:@&+$._-"\'`'
  let raw = input.value;
  raw = raw.toLowerCase();
  for (let x=0;x<cars.length;x++){
    raw = raw.replaceAll(cars[x], '');
  }
  if(aditional)raw=aditional+raw;
  output.innerText = 'https://comecuco.org/'+raw;
}
