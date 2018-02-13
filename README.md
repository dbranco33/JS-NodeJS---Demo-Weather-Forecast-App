# NodeJS - Demo Weather Forecast Application

Single Page Application using Node JS that allows the user to see the weather information for a city in the current day.      
Things like: current temperature, max and min temperature, probability of snow and of rain*, precipitation type*.     
(*Observation: through the Dark Sky API only)

#### Live-Demo: https://weatherapp-nodejs-demo.herokuapp.com/
![home_page](https://user-images.githubusercontent.com/26311583/36176498-6625b596-10d8-11e8-9388-21ad47c9c2bb.JPG)


### Some details about the app: 

- It's a weather reader from several sources using Node.js
- Sources are:    Dark Sky API, Apixu API, Open Weather API, Yahoo API.
- Sources are staked statically.
- User enter a city name in the specific input field and press a button to show weather forecast.
- Results are showed without reloading the page into a list.
- User can add an infinite number of cities where to look at the weather (one at time).
- If the user enters further queries, then the new forecasts appear above the previous forecast.
- Results are cleaned without reloading the page through a button with a custom Javascritp code.
- After closing the browser you can see your previous queries. An auto identifier is assigned, and it is written in cookies. 
- Application deployed at https://www.heroku.com/
