const request = require("request");

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3VzaG9iaGFuLTEyMyIsImEiOiJja2Izd2Ziem0wYTBkMnpvN21nam9hYWJ4In0.GMMmKn4Dqqk6OXQzJi6zAQ&limit=1`;
    request({url, json: true}, (error, response) => {
        if (error){
            callback('connection issue', undefined);
        }
        else if (response.body.features.length ===0)
        {
            callback('Invalid search query. Try another search.', undefined)
        }
        else{
            let place, coord;
            response.body.features.forEach(el => {
                 place = el.place_name;
                 coord = el.center;        
            });
            callback(undefined, {
                latitude: coord[1],
                longitude: coord[0],
                location: place
            }) 
        }
    })
}

module.exports = geoCode;