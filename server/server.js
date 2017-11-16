/*
    Script name: server.js
    Description: This script creates a web server and 
    defines that the web server will serve the static files 
    in 'assets' folder.
    Author: Daniel Lopes Branco
    Date Created: 2015-11-10
    Last Update: 2017-11-15
*/

//imports necessary modules to project.
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const weather = require('./weather/weather_app.js');

//variables for Web Server and Server Listening.
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//variable for path for public folder (from wich we'll serve static files).
const publicPath = path.join(__dirname, '../public');

//sets static files at web server.
app.use(express.static(publicPath));

//creates a route 
//redirect '/' to the 'index.html'
app.get('/', (request, response) => {
	response.send(publicPath + "index.html");
});

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

//starts the web server and socket.io server listening.
//sets the port '3000' for localhost plus an error message.
server.listen(process.env.PORT || 3000, () => {
	console.log("Server is up on port 3000.")
});

//event listener for when the client connects to server.
io.on('connection', (socket) => {
	console.log("New User Connected");

	//event listener for the click of 'show_info...' buttons from 'index.html'.
	socket.on('clicked', function(data) {
	  //when data is not null meand that the 'show_info' button was clicked.
	  if(data != null){
	  	//executes function to go after weather info for the city 
	  	//defined at 'data'.
	  	weather.getWeather(data, (return_value) => {
	  		//checks if the return_value has the weather info.
	  		if(typeof return_value.minTemperature != 'undefined'){
	  			console.log(return_value);
	  			
	  			//send 'return_value' data with the city weather info
	  			//for the 'event_listeners.js'
	  			io.emit('buttonUpdate', return_value);
	  		}
	  	});
	  }
	});
});