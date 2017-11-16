/*
    Script name: weatherInfo_apixu.js
    Description: Makes the API call to APIXU servers in order 
    to get the weather information for the city defined by 
    'lat' and 'lng'.
    Author: Daniel Lopes Branco
    Date Created: 2015-11-12
    Last Update: 2017-11-15
*/

//import necessary module
const request = require('request');

/*
 * Makes API call, collects the weather info
 * and send it back to 'server.js'
 */
var weatherInfo = function show_weather_info(city, lat, lng, callback) {
	//variable for the apiKey
	var apiKey = '83f785b57e49485fb4214121171411';

	//API request to Yahoo Weather API.
	request({
		url: 'https://api.apixu.com/v1/forecast.json?key=' + apiKey + '&q=' 
			+ lat + ',' + lng,
		json:true
	}, (error, response, body) => {	
		//Error Handling
		if(error){
			callback("Unable to connect to APIXU servers.");
		} else if(response.statusCode === 400) {
			callback("Unable to connect to take weather info.");
		} else if(response.statusCode === 200) {
			var chance_of_rain = body.forecast.forecastday[0].hour[0].chance_of_rain;
			var chance_of_snow = body.forecast.forecastday[0].hour[0].chance_of_snow;

			callback(undefined, 
			{
				name_of_city: city,
				current_temperature: body.current.temp_c,
				minTemperature: body.forecast.forecastday[0].day.mintemp_c,
				maxTemperature: body.forecast.forecastday[0].day.maxtemp_c,
				prob_rain: Number(chance_of_rain).toFixed(2),
				prob_snow: Number(chance_of_snow).toFixed(2),
				prec_type: 'not given'
			});
		} 
	});
};

module.exports.weatherInfo = weatherInfo;