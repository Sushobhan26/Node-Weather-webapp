const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=09bb9057b79bd057a9570eac04cf99d2&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    request({url, json: true}, (error, response) => {
        if (error){
            callback('connection issue', undefined);
        }
        else if (response.body.error)
        {
            //console.log(response.body.error)
            //console.log(url)
            callback('Invalid search query. Try another search.', undefined)
        }
        else{
            const data = response.body;
            callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degree celsius. It feels like ${data.current.feelslike} degree celsius. There is ${data.current.precip}% chance of rain. `);
        }
    })
}

module.exports = forecast;