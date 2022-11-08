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

function displayWeatherForcast() {
  let forcastElement = document.querySelector("#daily-weather-forcast");
  let forcastHTML = `<div class="row">`;
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
                  <div class="col">
                    <span class="day-of-week">${day}<br /></span>
                    <span class="days"> 18 Oct <br /><br /></span><br />

                    <img
                      src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/051/461/original/7.png?1667577135"
                      alt="rain-icon"
                      width="55"
                    />
                    <br /><br /><br />

                    <span class="days">
                      <span class="weather-forcast-temperature-max"> 24° </span>

                      <span class="weather-forcast-temperature-min"> 20° </span>
                      <br
                    /></span>
                    <span class="weather-description">Rain</span>
                    <br /><br />
                </div>`;
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

displayWeatherForcast();

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

      function fahrenheitConversion(event) {
        event.preventDefault();

        celciusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");

        celciusTemperture = Math.round(response.data.temperature.current);
        let conversion = (`${celciusTemperture}` * 9) / 5 + 32;
        let result = Math.round(`${conversion}`);
        let temperatureElement = document.querySelector("#temp");
        temperatureElement.innerHTML = `${result}`;
      }

      let fahrenheitLink = document.querySelector("#fahrenheit");
      fahrenheitLink.addEventListener("click", fahrenheitConversion);

      function celciusConversion(event) {
        event.preventDefault();

        celciusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");

        let temperatureElement = document.querySelector("#temp");
        temperatureElement.innerHTML = `${celciusTemperture}`;
      }

      let celciusLink = document.querySelector("#celcius");
      celciusLink.addEventListener("click", celciusConversion);
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

  function fahrenheitConversion(event) {
    event.preventDefault();
    celciusTemperture = Math.round(response.data.temperature.current);

    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let conversion = (`${celciusTemperture}` * 9) / 5 + 32;
    let result = Math.round(`${conversion}`);
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = `${result}`;
  }

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", fahrenheitConversion);

  function celciusConversion(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = `${celciusTemperture}`;
  }

  let celciusLink = document.querySelector("#celcius");
  celciusLink.addEventListener("click", celciusConversion);
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

let celciusTemperture = null;

//show date and time of the current location
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

function showDateTime(response) {
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

function showLocationTime(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=30375875oe08644bdt39b2fc0a58709a&units=metric`;
  axios.get(`${apiUrl}`).then(showDateTime);
}

function currentLocationTime(event) {
  navigator.geolocation.getCurrentPosition(showLocationTime);
}

let Button = document.querySelector("button");
Button.addEventListener("click", currentLocationTime);
