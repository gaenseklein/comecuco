# run this periodically to update weather.json
#curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33&lon=-68.8'|json_pp > ./public/weather.json
# run this periodicaly to update weather.json
# mendoza:
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33&lon=-68.8'|json_pp > ./public/weather.json
# Ciudad de San Luis: -33.28788008543451, -66.3306103440347
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33.3&lon=-66.3'|json_pp > ./public/sanluis.json
# Ciudad de San Juan: -31.541653230127974, -68.5306317190065
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-31.5&lon=-68.5'|json_pp > ./public/sanjuan.json
# Las Vegas, Potrerillos Mendoza: -33.00798428623082, -69.2760358135036
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33&lon=-69.2'|json_pp > ./public/lasvegas.json
# El Retamo, Lavalle, Mendoza: -32.455505539285895, -67.37721510122489
curl -A "comecuco.org github.com/gaenseklein/comecuco" -s 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-32.5&lon=-67.3'|json_pp > ./public/lavalle.json

node ./weatherToJson.js
