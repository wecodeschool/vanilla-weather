let date = document.querySelector("#weather-date");
let days = document.querySelectorAll(".day__block");
let description = document.querySelector("#weather-description");
let icon = document.querySelector(".weather__icon--today");
let place = document.querySelector("#weather-location");
let precipitation = document.querySelector("#precipitation-probality");
let temperature = document.querySelector(".weather-temp--today");
let wind = document.querySelector("#wind-speed");
let refreshBtn = document.querySelector("#weather-refresh");
let form = document.querySelector("#weather__form");
let formLocation = form.querySelector("#weather__form-location");

let root = "https://api.openweathermap.org";
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

function friendlyDay(dayNumber) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayNumber];
}

function friendlyMinutes(minutesNumber) {
  if (minutesNumber < 10) {
    return "0" + minutesNumber;
  } else {
    return minutesNumber;
  }
}

function friendlyDate(date) {
  let day = friendlyDay(date.getDay());
  let hours = date.getHours();
  let minutes = friendlyMinutes(date.getMinutes());

  return day + " " + hours + ":" + minutes;
}

function refreshWeather(queryParams) {
  let apiParams = "appid=" + apiKey + "&units=metric";
  axios
    .get(root + "/data/2.5/weather?" + apiParams + "&" + queryParams)
    .then(function(response) {
      date.innerHTML = friendlyDate(new Date());
      place.innerHTML = response.data.name;
      description.innerHTML = response.data.weather[0].main;
      temperature.innerHTML = Math.round(response.data.main.temp);
      wind.innerHTML = Math.round(response.data.wind.speed) + "km/h";
      precipitation.innerHTML = Math.round(response.data.main.humidity) + "%";

      icon.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.weather[0].icon +
          ".png"
      );
    });

  axios
    .get(root + "/data/2.5/forecast?" + apiParams + "&" + queryParams)
    .then(function(response) {
      document
        .querySelectorAll(".day__block")
        .forEach(function(element, index) {
          let day = new Date(response.data.list[index].dt_txt);
          element.querySelector(".day__block-date").innerHTML = friendlyDate(
            day
          );
          element.querySelector(".day__block-temp").innerHTML = Math.round(
            response.data.list[index].main.temp
          );

          element
            .querySelector(".day__block-image")
            .setAttribute(
              "src",
              "http://openweathermap.org/img/w/" +
                response.data.list[index].weather[0].icon +
                ".png"
            );
        });
    });
}

form.addEventListener("submit", function(event) {
  refreshWeather("q=" + form.querySelector("#weather__form-location").value);
  event.preventDefault();
});

refreshBtn.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    refreshWeather(
      "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
    );
  });
});

refreshWeather("q=Lisbon");
