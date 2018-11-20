let date          = document.querySelector('#weather-date');
let days          = document.querySelectorAll('.day__block');
let description   = document.querySelector('#weather-description');
let icon          = document.querySelector('.weather__icon--today');
let place         = document.querySelector('#weather-location');
let precipitation = document.querySelector('#precipitation-probality');
let temperature   = document.querySelector('.weather-temp--today');
let wind          = document.querySelector('#wind-speed');
let refreshBtn    = document.querySelector('#weather-refresh');

let root   = 'https://api.openweathermap.org';
let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';


function friendlyDate(date) {
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let minutes = date.getMinutes();
  if (minutes < 10) minutes += '0'

  return days[date.getDay() - 1] + ' ' + date.getHours() + ":" + minutes;
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
  function refreshWeather() {
    axios.get(root + '/data/2.5/weather?lat=' + Math.round(position.coords.latitude) + '&lon=' + Math.round(position.coords.longitude) + '&appid=' + apiKey + '&units=metric')
      .then(function (response) {

        date.innerHTML = friendlyDate(new Date());
        place.innerHTML = response.data.name;
        description.innerHTML = response.data.weather[0].main;
        temperature.innerHTML = Math.round(response.data.main.temp);
        wind.innerHTML = Math.round(response.data.wind.speed);
        precipitation.innerHTML = Math.round(response.data.main.humidity);
        icon.setAttribute('src', 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png')
      });

    axios.get(root + '/data/2.5/forecast?lat=' + Math.round(position.coords.latitude) + '&lon=' + Math.round(position.coords.longitude) + '&appid=' + apiKey + '&units=metric')
      .then(function (response) {
        document.querySelectorAll('.day__block').forEach(function (element, index) {
          let day = new Date(response.data.list[index].dt_txt);
          element.querySelector('.day__block-date').innerHTML = friendlyDate(day);
          element.querySelector('.day__block-temp--max').innerHTML = Math.round(response.data.list[index].main.temp_max);
          element.querySelector('.day__block-temp--min').innerHTML = Math.round(response.data.list[index].main.temp_min);
          element.querySelector('.day__block-image').setAttribute('src', 'http://openweathermap.org/img/w/' + response.data.list[index].weather[0].icon + '.png')
        });
      });
    }

    refreshBtn.addEventListener('click', function() {
      refreshWeather();
    });

    refreshWeather();
  });
} else {
  alert('We need access to your location, please refresh');
}
