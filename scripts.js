// @ts-nocheck

// Cache Elements 
const input = document.getElementById('search');
const button = document.getElementById('searchButton');
const weatherContainer = document.getElementById('weather-container');
let container = document.createElement('div');

// Global Variables
const apiKey = '4be0cf04eed25e997c6aed659cc1d3d3';
const googleApiKey = 'AIzaSyDIDISCV_kKELLLvZrUg8ReJTTrpLtdtQY';
let geolocationApiUrl = '';






// Get Picture from Google API Place and return a src
const getCityPictures = async (city) => {
   try {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const googleApiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&key=${googleApiKey}&inputtype=textquery&fields=name,photos`
      const response = await fetch(proxyUrl + googleApiUrl);
      const data = await response.json();
      return data.candidates[0].photos[0].photo_reference;
      
   } catch (error) {
      console.log(error);
   }
}

// Fetch GeoLocation Information based off the city entered by user. 
const getGeoLocation = async () => {
   container.remove();
   // Get GeoLocation of city
   try {
      const response = await fetch(geolocationApiUrl);
      const geoLocation = await response.json();
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
      displayWeather(weatherData);
   } catch (error) {
      console.log(error);
   }

}

//Display Weather Information
const displayWeather = async (weatherData) => {
   //get photo depending on the city searched and set it as the background of the container
   let reference = await getCityPictures(weatherData.name);
   const googleSrcUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${reference}&key=${googleApiKey}&maxwidth=3840&maxheight=2160`;

   //create Weather Div
   container = document.createElement('div');
   container.classList.add('weather-results-container');
   container.style.backgroundImage = `url(${googleSrcUrl})`;
   //create styling container div
   const stylingContainer = document.createElement('div');
   stylingContainer.classList.add('styling-weather-results-container');
   //create City Title
   const title = document.createElement('h2');
   title.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
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
   // create Img Element Depending if the weather condition includes one of the following keywords
   const weatherImg = document.createElement('img');
   weatherImg.classList.add('weather-img')

   if (weatherData.weather[0].description.includes('sun')) {
      weatherImg.setAttribute('src', './img/sun.gif')
   } else if (weatherData.weather[0].description.includes('snow')) {
      weatherImg.setAttribute('src', './img/snow.gif')
   } else if (weatherData.weather[0].description.includes('clouds')) {
      weatherImg.setAttribute('src', './img/clouds.gif')
   } else if (weatherData.weather[0].description.includes('rain')) {
      weatherImg.setAttribute('src', './img/rain.gif')
   } else if (weatherData.weather[0].description.includes('clear')) {
      weatherImg.setAttribute('src', './img/clearsky.png')
   } else if (weatherData.weather[0].description.includes('mist')) {
      weatherImg.setAttribute('src', './img/mist.gif')
   } 
   // Add the Elements inside container Element
   weatherContainer.appendChild(container);
   container.appendChild(stylingContainer);
   stylingContainer.appendChild(title);
   stylingContainer.appendChild(weatherImg);
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


input.addEventListener('keypress', (event) => {
   if(input.value !== "" && event.keyCode === 13){
      const city = input.value;
      geolocationApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&sort=population&limit=5&appid=${apiKey}&units=imperial`;
      getGeoLocation();
  }
})
