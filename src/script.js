//Getting the current Date and time of a searched city
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDay = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[now.getMonth()];
  return `${currentDay} ${date} ${currentMonth} ${hours}:${mins}`;
}

//Function to get the weather forcast of the city entered by the user
function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let city = `${citySearch.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  if (city) {
    let apiKey = "30375875oe08644bdt39b2fc0a58709a";
    let apiLink = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(`${apiLink}`).then(weatherForcast);
    function weatherForcast(response) {
      let description = response.data.condition.description;
      let currentDescription = document.querySelector("#description-now");
      currentDescription.innerHTML = `${description}`;

      let humidity = response.data.temperature.humidity;
      let currentHumidity = document.querySelector("#humidity-now");
      currentHumidity.innerHTML = `${humidity}`;

      let windSpeed = Math.round(response.data.wind.speed);
      let currentWindSpeed = document.querySelector("#windspeed-now");
      currentWindSpeed.innerHTML = `${windSpeed}`;

      let temperature = Math.round(response.data.temperature.current);
      let tempNow = document.querySelector("#temp");
      tempNow.innerHTML = `${temperature}`;

      let pressure = response.data.temperature.pressure;
      let currentPressure = document.querySelector("#pressure-now");
      currentPressure.innerHTML = `${pressure}`;

      let icon = response.data.condition.icon_url;
      let currentIcon = document.querySelector("#icon");
      currentIcon.setAttribute("src", `${icon}`);
      currentIcon.setAttribute("alt", `${description}`);

      let dateElement = document.querySelector("#date");
      dateElement.innerHTML = formatDate(response.data.time * 1000);

      function tempConversion(event) {
        event.preventDefault();
        let temperature = Math.round(response.data.temperature.current);
        let conversion = (`${temperature}` * 9) / 5 + 32;
        let result = Math.round(`${conversion}`);
        let temperatureElement = document.querySelector("#temp");
        temperatureElement.innerHTML = `${result}`;
      }
      let fahrenheitLink = document.querySelector("#fahrenheit");
      fahrenheitLink.addEventListener("click", tempConversion);
    }
  } else {
    h1.innerHTML = null;
    alert("Please Enter a city 😔");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Getting user's current weather forcast
function showTemperature(response) {
  let currentCity = response.data.city;
  let currentTemperature = Math.round(response.data.temperature.current);
  let weatherDescription = response.data.condition.description;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.temperature.humidity;
  let icon = response.data.condition.icon_url;
  let pressure = response.data.temperature.pressure;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${currentTemperature}`;
  let currentWeatherDescription = document.querySelector("#description-now");
  currentWeatherDescription.innerHTML = `${weatherDescription}`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute("src", `${icon}`);
  currentIcon.setAttribute("alt", `${weatherDescription}`);
  let currentHumidity = document.querySelector("#humidity-now");
  currentHumidity.innerHTML = `${humidity}`;
  let currentWindSpeed = document.querySelector("#windspeed-now");
  currentWindSpeed.innerHTML = `${windSpeed}`;
  let currentPressure = document.querySelector("#pressure-now");
  currentPressure.innerHTML = `${pressure}`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=30375875oe08644bdt39b2fc0a58709a&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", currentLocation);
