//Weather API
function displayTheWeather(result) {
  let currentValue = document.querySelectorAll(".current-value");
  let temperatureNow = Math.round(result.data.list[0].main.temp);
  let minTomorrow = Math.round(result.data.list[7].main.temp_min) - 2;
  let maxTomorrow = Math.round(result.data.list[7].main.temp_max) + 2;
  let minSecond = Math.round(result.data.list[15].main.temp_min) - 2;
  let maxSecond = Math.round(result.data.list[15].main.temp_max) + 2;
  let minThird = Math.round(result.data.list[23].main.temp_min) - 2;
  let maxThird = Math.round(result.data.list[23].main.temp_max) + 2;
  let minFourth = Math.round(result.data.list[31].main.temp_min) - 2;
  let maxFourth = Math.round(result.data.list[31].main.temp_max) + 2;
  let minFifth = Math.round(result.data.list[39].main.temp_min) - 2;
  let maxFifth = Math.round(result.data.list[39].main.temp_max) + 2;
  let currentStatus = document.querySelector(".current-status");
  let status = result.data.list[0].weather[0].description;
  let chanceOfRain = document.querySelector(".chance-of-rain");
  let chanceOfRainValue = result.data.list[0].pop * 100;
  let humidity = document.querySelector(".humidity");
  let humidityValue = result.data.list[0].main.humidity;
  let windSpeed = document.querySelector(".wind-speed");
  let windSpeedValue = result.data.list[0].wind.speed;

  currentValue[0].innerHTML = `${temperatureNow}`;
  currentValue[1].innerHTML = `${maxTomorrow}`;
  currentValue[2].innerHTML = `${minTomorrow}`;
  currentValue[3].innerHTML = `${maxSecond}`;
  currentValue[4].innerHTML = `${minSecond}`;
  currentValue[5].innerHTML = `${maxThird}`;
  currentValue[6].innerHTML = `${minThird}`;
  currentValue[7].innerHTML = `${maxFourth}`;
  currentValue[8].innerHTML = `${minFourth}`;
  currentValue[9].innerHTML = `${maxFifth}`;
  currentValue[10].innerHTML = `${minFifth}`;
  currentStatus.innerHTML = `${status} `;
  chanceOfRain.innerHTML = `${chanceOfRainValue}`;
  humidity.innerHTML = `${humidityValue}`;
  windSpeed.innerHTML = `${windSpeedValue}`;
}

function runApi() {
  let apiKey = `397814a0e3bfa6c63a4e98c59df0047f`;
  let city = document.querySelector("h1").innerHTML.trim();
  let unit = "metric";
  let newUnit = document.querySelector(".new-unit");
  if (newUnit.innerHTML === ` /ºC`) {
    unit = "imperial";
  }
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast`;
  let apiUrl = `${apiEndPoint}?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTheWeather);
}

runApi();

//current Location
function changeToYourCity(results) {
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${results.data.name}`;
  runApi();
}

function findCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `397814a0e3bfa6c63a4e98c59df0047f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(changeToYourCity);
}
function findYourLocation() {
  navigator.geolocation.getCurrentPosition(findCoords);
}

let yourLocation = document.querySelector(".your-location");
yourLocation.addEventListener("click", findYourLocation);

// dates code
new Date();
let currentDate = document.querySelector("#current-date");
let followingSecond = document.querySelector("#followingdays-second");
let followingThird = document.querySelector("#followingdays-third");
let followingFourth = document.querySelector("#followingdays-fourth");
let followingFifth = document.querySelector("#followingdays-fifth");

function calculateDays(eachDay) {
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (new Date().getDay() + eachDay >= 7) {
    return dayNames[new Date().getDay() + eachDay - 7];
  } else {
    return dayNames[new Date().getDay() + eachDay];
  }
}

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = monthNames[new Date().getMonth()];
let number = new Date().getDate();
let year = new Date().getFullYear();

currentDate.innerHTML = `${calculateDays(0)}, ${month} ${number}, ${year}`;
followingSecond.innerHTML = `${calculateDays(2)}`;
followingThird.innerHTML = `${calculateDays(3)}`;
followingFourth.innerHTML = `${calculateDays(4)}`;
followingFifth.innerHTML = `${calculateDays(5)}`;

//search engine
function searchCity(event) {
  event.preventDefault();
  let userImput = document.querySelector(".change-city-imput");
  let h1 = document.querySelector("h1");
  if (userImput.value.length > 0) {
    h1.innerHTML = `${userImput.value}`;
    runApi();
  } else {
    alert(`Please, write the name of your city in the Change City area.`);
  }
}

let userCity = document.querySelector(".change-city");
userCity.addEventListener("submit", searchCity);

// Celsius to Fahrenheit function

function toCelsius(values) {
  let valuesconverted = parseInt(values.innerHTML);
  values.innerHTML = ` ${Math.round(((valuesconverted - 32) * 5) / 9)}`;
}

function unitToCelsius(text) {
  text.innerHTML = `ºC`;
}

function toFahrenheit(values) {
  let valuesconverted = parseInt(values.innerHTML);
  values.innerHTML = ` ${Math.round((valuesconverted * 9) / 5 + 32)}`;
}

function unitToFahrenheit(text) {
  text.innerHTML = `ºF`;
}

function changeUnits() {
  let newUnit = document.querySelector(".new-unit");
  let currentUnit = document.querySelectorAll(".current-unit");
  let currentValue = document.querySelectorAll(".current-value");
  if (newUnit.innerHTML === ` /ºF`) {
    newUnit.innerHTML = ` /ºC`;
    currentUnit.forEach(unitToFahrenheit);
    currentValue.forEach(toFahrenheit);
  } else {
    newUnit.innerHTML = ` /ºF`;
    currentUnit.forEach(unitToCelsius);
    currentValue.forEach(toCelsius);
  }
}

let temperatureUnits = document.querySelector(".new-unit");
temperatureUnits.addEventListener("click", changeUnits);
