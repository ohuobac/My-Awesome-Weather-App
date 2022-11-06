//Getting the user's Date and time
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let mins = now.getMinutes();
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

let dayOfWeek = document.querySelector("#week-day");
dayOfWeek.innerHTML = `${currentDay}`;
let dayInteger = document.querySelector("#day");
dayInteger.innerHTML = `${date}`;
let monthOfYear = document.querySelector("#month");
monthOfYear.innerHTML = `${currentMonth}`;
let hourOfDay = document.querySelector("#hour");
hourOfDay.innerHTML = `${hours}`;
let minOfHour = document.querySelector("#min");
minOfHour.innerHTML = `${mins}`;

//Function to get the weather forcast of the city entered by the user
function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let city = `${citySearch.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.toUpperCase()}`;

  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  function weatherForcast(response) {
    let description = response.data.weather[0].main;
    let currentDescription = document.querySelector("#description-now");
    currentDescription.innerHTML = `${description}`;

    let humidity = response.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity-now");
    currentHumidity.innerHTML = `${humidity}`;

    let windSpeed = Math.round(response.data.wind.speed);
    let currentWindSpeed = document.querySelector("#windspeed-now");
    currentWindSpeed.innerHTML = `${windSpeed}`;

    let temperature = Math.round(response.data.main.temp);
    let tempNow = document.querySelector("#temp");
    tempNow.innerHTML = `${temperature}`;

    let visibility = response.data.weather[0].id;
    let currentVisibility = document.querySelector("#visibility-now");
    currentVisibility.innerHTML = `${visibility}`;
  }
  axios.get(`${apiUrl}`).then(weatherForcast);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Function to get current location and it's temperature
function showTemperature(response) {
  let currentCity = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = `${currentTemperature}`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a33b693cfbefd271b0ed075f9a8f65f0&units=metric`;
  axios.get(`${apiLink}`).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", currentLocation);
