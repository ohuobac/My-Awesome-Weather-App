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

      //Displaying the 5 day weather forcast of a searched city

      let apiLinkk = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=30375875oe08644bdt39b2fc0a58709a&units=metric`;
      axios.get(`${apiLinkk}`).then(displayWeatherForcast);

      function displayWeatherForcast(response) {
        function formatDay(timestamp) {
          let date = new Date(timestamp * 1000);
          let day = date.getDay();
          let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

          return days[day];
        }

        function formatDayMonth(timestamp) {
          let date = new Date(timestamp * 1000);
          let dateNumber = date.getDate();
          let month = date.getMonth();
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
          let forcastMonth = months[month];
          return `${dateNumber} ${forcastMonth}`;
        }
        let forcast = response.data.daily;
        let forcastElement = document.querySelector("#daily-weather-forcast");
        let forcastHTML = `<div class="row">`;
        forcast.forEach(function (forcastDay, index) {
          if (index < 5) {
            forcastHTML =
              forcastHTML +
              `
                  <div class="col">
                    <span class="day-of-week">${formatDay(
                      forcastDay.time
                    )}<br /></span>
                    <span class="days">${formatDayMonth(
                      forcastDay.time
                    )}  <br /><br /></span><br />

                    <img
                      src="${forcastDay.condition.icon_url}"
                      alt="${forcastDay.condition.icon}"
                      width="55"
                    />
                    <br /><br /><br />

                    <span class="days">
                      <span class="weather-forcast-temperature-max">${Math.round(
                        forcastDay.temperature.maximum
                      )}°</span>
                      <span class="weather-forcast-temperature-min">${Math.round(
                        forcastDay.temperature.minimum
                      )}°</span>
                      <br
                    /></span>
                    <span class="weather-description">${
                      forcastDay.condition.description
                    }</span>
                    <br /><br />
                </div>`;
          }
        });
        forcastHTML = forcastHTML + `</div>`;
        forcastElement.innerHTML = forcastHTML;
      }
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

//First screen interaction with user

let city = "Lagos";
let h1 = document.querySelector("h1");
h1.innerHTML = `${city}`;

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

  //Displaying the 5 day weather forcast of a searched city

  let apiLinkk = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=30375875oe08644bdt39b2fc0a58709a&units=metric`;
  axios.get(`${apiLinkk}`).then(displayWeatherForcast);

  function displayWeatherForcast(response) {
    function formatDay(timestamp) {
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

      return days[day];
    }

    function formatDayMonth(timestamp) {
      let date = new Date(timestamp * 1000);
      let dateNumber = date.getDate();
      let month = date.getMonth();
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
      let forcastMonth = months[month];
      return `${dateNumber} ${forcastMonth}`;
    }
    let forcast = response.data.daily;
    let forcastElement = document.querySelector("#daily-weather-forcast");
    let forcastHTML = `<div class="row">`;
    forcast.forEach(function (forcastDay, index) {
      if (index < 5) {
        forcastHTML =
          forcastHTML +
          `
                  <div class="col">
                    <span class="day-of-week">${formatDay(
                      forcastDay.time
                    )}<br /></span>
                    <span class="days">${formatDayMonth(
                      forcastDay.time
                    )}  <br /><br /></span><br />

                    <img
                      src="${forcastDay.condition.icon_url}"
                      alt="${forcastDay.condition.icon}"
                      width="55"
                    />
                    <br /><br /><br />

                    <span class="days">
                      <span class="weather-forcast-temperature-max">${Math.round(
                        forcastDay.temperature.maximum
                      )}°</span>
                      <span class="weather-forcast-temperature-min">${Math.round(
                        forcastDay.temperature.minimum
                      )}°</span>
                      <br
                    /></span>
                    <span class="weather-description">${
                      forcastDay.condition.description
                    }</span>
                    <br /><br />
                </div>`;
      }
    });
    forcastHTML = forcastHTML + `</div>`;
    forcastElement.innerHTML = forcastHTML;
  }
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

//Showing the 5 day weather forcast of the user's current location

function displayCurrentWeatherForcast(response) {
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[day];
  }

  function formatDayMonth(timestamp) {
    let date = new Date(timestamp * 1000);
    let dateNumber = date.getDate();
    let month = date.getMonth();
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
    let forcastMonth = months[month];
    return `${dateNumber} ${forcastMonth}`;
  }
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#daily-weather-forcast");
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
                  <div class="col">
                    <span class="day-of-week">${formatDay(
                      forcastDay.time
                    )}<br /></span>
                    <span class="days">${formatDayMonth(
                      forcastDay.time
                    )}  <br /><br /></span><br />

                    <img
                      src="${forcastDay.condition.icon_url}"
                      alt="${forcastDay.condition.icon}"
                      width="55"
                    />
                    <br /><br /><br />

                    <span class="days">
                      <span class="weather-forcast-temperature-max">${Math.round(
                        forcastDay.temperature.maximum
                      )}°</span>
                      <span class="weather-forcast-temperature-min">${Math.round(
                        forcastDay.temperature.minimum
                      )}°</span>
                      <br
                    /></span>
                    <span class="weather-description">${
                      forcastDay.condition.description
                    }</span>
                    <br /><br />
                </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function showDateTime(response) {
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

function showLocationForcast(position) {
  let latt = position.coords.latitude;
  let long = position.coords.longitude;
  let link = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${latt}&key=30375875oe08644bdt39b2fc0a58709a&units=metric`;
  axios.get(`${link}`).then(displayCurrentWeatherForcast);
}

function currentLocationForcast(event) {
  navigator.geolocation.getCurrentPosition(showLocationForcast);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocationForcast);

//Showing the date and time of the current location of the user

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
