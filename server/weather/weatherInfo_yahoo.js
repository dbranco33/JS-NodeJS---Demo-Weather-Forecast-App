/*
    Script name: weatherInfo_yahoo.js
    Description: Makes the API call to the Yahoo servers 
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
	//encodes city name
	var city_name = encodeURIComponent(city);

	//API request to Yahoo Weather API.
	request({
		url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from' +
		'%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from'  +
		'%20geo.places(1)%20where%20text%3D%22'+city_name+'%2C%20ak%22)%20and%20' + 
		'u="c"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
		json:true
	}, (error, response, body) => {	
		//Error Handling
		if(error){
			callback("Unable to connect to Yahoo servers.");
		} else if(response.statusCode === 400) {
			callback("Unable to connect to take weather info.");
		} else if(response.statusCode === 200) {
			callback(undefined, 
			{
				name_of_city: city,
				current_temperature: body.query.results.channel.item.condition.temp,
				minTemperature: body.query.results.channel.item.forecast[0].low,
				maxTemperature: body.query.results.channel.item.forecast[0].high,
				prob_rain: 'not given',
				prob_snow: 'not given',
				prec_type: 'not given'
			});
		} 
	});
};

module.exports.weatherInfo = weatherInfo;