/*
    Script name: weatherInfo_darksky.js
    Description: Makes the API call to the Dark Sky servers 
    in order to get the city weather info.
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
var weatherInfo = (city, lat, lng, callback) => {
	//variable for the apiKey
	var apiKey = '5f716adac59d41a61887601b6d3b782a';

	//API request to Dark Sky API/
	request({
		// url takes apiKey, the city's latitude and longitude
		// and we use the units sets to auto (to change according 
		// with the user area, e.g. Temperature in Celsius in CA
		// and in Farenheit at US)
		url: 'https://api.darksky.net/forecast/' + apiKey + '/' + lat + ',' 
			+ lng + '?units=auto',
		json:true
	}, (error, response, body) => {	
		//Error Handling
		if(error){
			callback("Unable to connect to Forecast.io servers.");
		} else if(response.statusCode === 400) {
			callback("Unable to connect to take weather info.");
		} else if(response.statusCode === 200) {
			callback(undefined, 
			{
				name_of_city: city,
				current_temperature: body.currently.temperature,
				minTemperature: body.daily.data[0].temperatureMin,
				maxTemperature: body.daily.data[0].temperatureMax,
				prob_rain: ((body.daily.data[0].precipProbability)*100).toFixed(2),
				prob_snow: ((body.daily.data[0].precipProbability)*100).toFixed(2),
				prec_type: body.daily.data[0].precipType
			});
		} 
	});
};

module.exports.weatherInfo = weatherInfo;