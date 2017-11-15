/*
    Script name: weather_app.js
    Description: This script creates a web server and 
    defines that the web server will serve the static files 
    in 'assets' folder.
    Author: Daniel Lopes Branco
    Date Created: 2015-11-12
    Last Update: 2017-11-15
*/

//Import modules and files.
const request = require('request');
const geocode = require('./geocode.js');
const weather_api_1 = require('./weatherInfo_darksky.js');
const weather_api_2 = require('./weatherInfo_apixu.js');
const weather_api_3 = require('./weatherInfo_openweathermap.js');
const weather_api_4 = require('./weatherInfo_yahoo.js');

/*
 * Triggers the correct js files to make API calls to return 
 * weather information. Sends this data to 
 *
 * return  error, results
 */
var getWeather = (data_to_receive, callback) =>{
	//variables to collect the 'button_id' and 'city_name' information.
	var button_id = data_to_receive[0];
	var city_name = data_to_receive[1];

	console.log('The button id is: ' + button_id);

	//checks the id of the button that was clicked to
	//choose wich API call to process.
	switch(button_id) {

	    case 'show_info_1':
	        //--> Getting weather information through Google Maps API and Dark Sky API.
			geocode.geocodeCity(city_name, (error, results) => {
				if(error){
					callback(error);
				}
				else{
					console.log('Google Maps API "OK". Geolocation for: '+ 
							  results.city);
					weather_api_1.weatherInfo(results.city, results.latitude, results.longitude, 
						(error, weatherResults) => {	
							if(error){
								callback(error);
							} else {
								console.log('Dark Sky API "OK". Weather info gotten.');
								callback(weatherResults);
							}
						}
					);
				}
			});
	        break;

	    case 'show_info_2':
	    	//--> Getting weather information through APIXU Weather API.
	    	geocode.geocodeCity(city_name, (error, results) => {
				if(error){
					callback(error);
				}
				else{
					console.log('Google Maps API "OK". Geolocation for: '+ 
							  results.city);
					weather_api_2.weatherInfo(results.city, results.latitude, results.longitude, 
						(error, weatherResults) => {	
							if(error){
								callback(error);
							} else {
								console.log('APIXU Weather API "OK". Weather info gotten.');
								callback(weatherResults);
							}
						}
					);
				}
			});
	        break;

	    case 'show_info_3':
			//--> Getting weather information through OpenWeather API.
			weather_api_3.weatherInfo(city_name, (error, results) => {	
				if(error){
					callback(error);
				} else {
					console.log('Openweathermap API "OK". Weather info gotten.');
					callback(results);
				}
			});
	        break;
	        
	    case 'show_info_4':
			//--> Getting weather information through Yahoo Weather API.
			weather_api_4.weatherInfo(city_name, (error, results) => {	
				if(error){
					console.log(error);
				} else {
					console.log('Yahoo Weather API "OK". Weather info gotten.');
					callback(results);
				}
			});
	        break;
    }
}

module.exports.getWeather = getWeather;