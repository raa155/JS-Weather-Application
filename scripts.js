// @ts-nocheck

// Cache Elements 
const input = document.getElementById('search');
const button = document.getElementById('searchButton');
const weatherContainer = document.getElementById('weather-container');


// Global Variables
const apiKey = '4be0cf04eed25e997c6aed659cc1d3d3';
let geolocationApiUrl = '';



// Fetch GeoLocation Information based off the city entered by user. 
const getGeoLocation = async () => {
   
   // Get GeoLocation of city
   try {
      const response = await fetch(geolocationApiUrl);
      const geoLocation = await response.json();
      console.log(geoLocation)
      let lon = geoLocation[0].lon;
      let lat = geoLocation[0].lat;
      getWeather(lon, lat)
   } catch (error) {
      console.log(error);
   }
}

// Fetch Weather Information using the Longitude and latitude retrieved from the Geolocation api
const getWeather = async (lon, lat) => {
   const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
   // Get Weather Information for City Searched
   try {
      const response = await fetch(weatherApiUrl);
      const weatherData = await response.json();
      console.log(weatherData);
      displayWeather(weatherData);
   } catch (error) {
      console.log(error);
   }

}

//Display Weather Information
const displayWeather = (weatherData) => {
   //create Weather Div
   const container = document.createElement('div');
   container.classList.add('weather-results-container')
   //create styling container div
   const stylingContainer = document.createElement('div');
   stylingContainer.classList.add('styling-weather-results-container');
   //create City Title
   const title = document.createElement('h2');
   title.textContent = `Location: ${weatherData.name}, ${weatherData.sys.country}`;
   //create divider
   const divider = document.createElement('span');
   divider.innerHTML = "<br>"
   divider.classList.add('divider');
   //create City temp
   const temp = document.createElement('p');
   temp.textContent = `Temperature: °${Math.floor(weatherData.main.temp)} Farenheit`;
   // Create City Feels Like Temp Element
   const feelsLike = document.createElement('p');
   feelsLike.textContent = `Feels Like: °${Math.floor(weatherData.main.feels_like)} Farenheit`;
   // Create City Weather Condition
   const weatherCondition = document.createElement('p');
   weatherCondition.textContent = `Weather Condition: ${weatherData.weather[0].description}`;
   // Create City Wind Speed Condition
   const windSpeed = document.createElement('p');
   windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed} mph`;
   // Create City Humidity Condition Element
   const Humidity = document.createElement('p');
   Humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
   // Add the Elements inside container Element
   weatherContainer.appendChild(container);
   container.appendChild(stylingContainer);
   stylingContainer.appendChild(title);
   stylingContainer.appendChild(divider);
   stylingContainer.appendChild(temp);
   stylingContainer.appendChild(feelsLike);
   stylingContainer.appendChild(weatherCondition);
   stylingContainer.appendChild(windSpeed);
   stylingContainer.appendChild(Humidity);

}

//Display Error If city does not exist
const displayError = () => {

}


// Event Listeners 
button?.addEventListener('click', () => {

   const city = input.value;
   geolocationApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&sort=population&limit=5&appid=${apiKey}&units=imperial`;
   getGeoLocation();
})
