/*
    Script name: geocode.js
    Description: This script creates a web server and 
    defines that the web server will serve the static files 
    in 'assets' folder.
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
var geocodeCity = function locate_city (city_name, callback) {
	//encodes city name
	var encoded_city_name = encodeURIComponent(city_name);

	//API request to Google Maps API in order to get the 
	//city latitude and longitude information.
	request({
		url:'https://maps.googleapis.com/maps/api/geocode/json?address=' 
			+ encoded_city_name,
		json:true
	}, (error, response, body) => {
		//Error Handling
		if(error){
			callback("Unable to connect to Google servers.");
		} else if(body.status === 'ZERO_RESULTS'){
			callback("Unable to find the city name.");
		} else if(body.status === 'OK') {
			callback(undefined, 
			{
				city: city_name,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		} else {
			//Some fews times the function doesn't return an error/response.
			//At this case we repeat the function to avoid to make the user
			//click the 'Show Info' button again for this reason. 
			locate_city(city_name, callback);
		}
	});
};

module.exports.geocodeCity =  geocodeCity;