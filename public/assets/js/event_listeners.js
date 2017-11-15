/*
    Script name: event_listeners.js
    Description: Static script file to add event listener to the buttons at 'index.html',
    change the content of some html elements, and be connected to the server file 'server.js' 
    in order to exchange data (receive/send).
    Date Created: 2017-11-10
    Last Update: 2017-11-15
*/

// it's a method from 'socket.io' JS library. 
// It'll initiate a request from the client to the server 
// to open up a web socket and keep that connection opened.

/*
 * It'll initiate a request from the client to the server
 * to open up a web socket and keep the connection opened.
 */
var socket = io();

// it'as an array variable to hold the cookie data.
var cookies_data = [];


////Functions 

/*
 * Gets the id value of the button that was clicked, and the 
 * text that was input for the city information. Sends this 
 * information to 'server.js' as an array variable.
 */
function showClicked(){
	//gets the 'id' of the button clicked into a variable.
	var button_id = this.id;

	//gets the text input and remove white spaces at beginning and end of the input.
	var city_name = 
		document.getElementById("city").value.trimLeft().trimRight();

	//checks for empty field or field that contains only spaces.
	if (city_name.trim() == ""){
		alert("The input is empty. Please enter a city name.");
	}else{
		//create variable to send 'button_id' and 'city_name'
		var data_to_send = [button_id, city_name]
		//sends 'data_to_send' variable to 'weather_app.js'
		socket.emit('clicked', data_to_send);
	}

	//erases the input field
	document.getElementById("city").value = '';
}


/*
 * Cleans the data into the text field input, 
 * erases the table rows letting none weather information
 * and removes the cookie 'last_visit'.
 */
function clearClicked(){
	if(confirm('Are you sure?')){
		document.getElementById("weather_data").innerHTML = '';
		document.getElementById("city").value = '';
		Cookies.remove('last_visit');
	} else {
		//do nothing.
	}	
}

/*
 * Takes the string parsed as argument and 
 * formats this as Capitalized.
 *
 * return string
 */
function firstLetterUppercase(string){
	var firstLetter = string.charAt(0).toUpperCase();
	var restOfString = string.slice(1).toLowerCase();

	return firstLetter + restOfString;
}


////Event listeners

/*
 * Event listener for when the server connects to client.
 */
socket.on('connect', function () {
  console.log("Connected to Server");

  //event listener for when the server disconnects from client.
  socket.on('disconnect', function () {
  	console.log("User was disconnected.");
  });
});

/*
 * Event listener for the 'buttonUpdate' event.
 */
socket.on('buttonUpdate', function(data){
	//formatting the name of the city to be capitalized.
	var name_of_city = firstLetterUppercase(data.name_of_city);

	cookies_data.unshift(data);

	document.getElementById("weather_data").innerHTML =
	`<tr >
		<td>${name_of_city}</td>
		<td>${data.current_temperature}</td>
		<td>${data.minTemperature}</td>
		<td>${data.maxTemperature}</td>
		<td>${data.prob_rain}</td>
		<td>${data.prob_snow}</td>
		<td>${data.prec_type}</td>
	</tr>` + document.getElementById("weather_data").innerHTML;

	//creates a cookie 'last_visit' that'll expire in 1 day. 
	Cookies.set('last_visit', cookies_data, { expires: 1, path: '' });	
});
	
//show cookies available from previous queries.
document.getElementById("test1").innerHTML = Cookies.get('last_visit');

//add event listener to buttons 'show_info...'
document.getElementById("show_info_1").addEventListener("click", showClicked);
document.getElementById("show_info_2").addEventListener("click", showClicked);
document.getElementById("show_info_3").addEventListener("click", showClicked);
document.getElementById("show_info_4").addEventListener("click", showClicked);
//add event listener to button 'clear_info'
document.getElementById("clear_info").addEventListener("click", clearClicked);