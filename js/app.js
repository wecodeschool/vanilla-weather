let selected      = document.querySelector('.day__block--selected');
let days          = document.querySelectorAll('.day__block');
let temperature   = document.querySelector('.weather-temp--today');
let wind          = document.querySelector('#wind-speed');
let precipitation = document.querySelector('#precipitation-probality');
let description   = document.querySelector('#weather-description');
let place         = document.querySelector('#weather-location');
let icon          = document.querySelector('.weather__icon--today');

let root   = 'https://api.openweathermap.org';
let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
let path   = 'data/2.5/weather';
let city   = 'Lisbon';

axios.get(root + '/' + path + '?q=' + city + '&appid=' + apiKey + '&units=metric')
  .then(function(response) {
    // console.log(response.data)
    place.innerHTML         = response.data.name;
    description.innerHTML   = response.data.weather[0].main;
    temperature.innerHTML   = Math.round(response.data.main.temp);
    wind.innerHTML          = Math.round(response.data.wind.speed);
    precipitation.innerHTML = Math.round(response.data.main.humidity);
    icon.setAttribute('src', 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png')
  });


  // https://api.openweathermap.org/data/2.5/forecast?q=Lisbon&units=metric&appid=5f472b7acba333cd8a035ea85a0d4d4c
path = 'data/2.5/forecast';
axios.get(root + '/' + path + '?q=' + city + '&appid=' + apiKey + '&units=metric')
  .then(function(response) {
    document.querySelectorAll('.day__block').forEach(function(element, index) {
      element.querySelector('.day__block-temp--max').innerHTML = Math.round(response.data.list[index].main.temp_max);
      element.querySelector('.day__block-temp--min').innerHTML = Math.round(response.data.list[index].main.temp_min);
      element.querySelector('.day__block-image').setAttribute('src', 'http://openweathermap.org/img/w/' + response.data.list[index].weather[0].icon + '.png')
    });
  });

