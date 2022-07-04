# run this periodically to update weather.json
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33&lon=-68.8'|json_pp > ./public/weather.json
node ./weatherToJson.js
