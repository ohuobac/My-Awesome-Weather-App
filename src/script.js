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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a City");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function celcius(event) {
  event.preventDefault();
  let tempID = document.querySelector("#temp");
  tempID.innerHTML = "19";
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celcius);

function fahrenheit(event) {
  event.preventDefault();
  let tempID = document.querySelector("#temp");
  tempID.innerHTML = "66";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheit);
