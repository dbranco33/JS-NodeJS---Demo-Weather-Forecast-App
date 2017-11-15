/*
    Script name: weatherInfo_openweathermap.js
    Description: Makes the API call to the Openweather servers 
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
var weatherInfo = function show_weather_info(city, callback) {
	//variable for the apiKey
	var apiKey = '2f462f216b40580ea08085d1bd9ef9a4';

	//encodes city name
	var city_name = encodeURIComponent(city);

	//API request to Openweathermap API.
	request({
		url: 'https://api.openweathermap.org/data/2.5/weather?q=' + 
			 city_name + '&units=metric&appid=' + apiKey,
		json:true
	}, (error, response, body) => {	
		//Error Handling
		if(error){
			callback("Unable to connect to Openweathermap servers.");
		} else if(response.statusCode === 400) {
			callback("Unable to connect to take weather info.");
		} else if(response.statusCode === 200) {
			callback(undefined, 
			{
				name_of_city: body.name,
				current_temperature: body.main.temp,
				minTemperature: body.main.temp_min,
				maxTemperature: body.main.temp_max,
				prob_rain: 'not given',
				prob_snow: 'not given',
				prec_type: 'not given'
			});
		} 
	});
};

module.exports.weatherInfo = weatherInfo;