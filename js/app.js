let selected      = document.querySelector('.day__block--selected');
let days          = document.querySelectorAll('.day__block');
let temperature   = document.querySelector('.weather-temp--today');
let wind          = document.querySelector('#wind-speed');
let precipitation = document.querySelector('#precipitation-probality');
let description   = document.querySelector('#weather-description');
let place         = document.querySelector('#weather-location');
let icon          = document.querySelector('.weather__icon--today');


// function refreshTemp(event) {
//   todayTemp.innerHTML = event.currentTarget.getAttribute('max');
//   document.querySelector('.day__block--selected').classList.remove('day__block--selected');
//   event.currentTarget.classList.add('day__block--selected');

//   let iconPath = 'images/' + event.currentTarget.getAttribute('conditions') + '.png'
//   todayIcon.setAttribute('src', iconPath);
// };

// days.forEach(function(day, index) {
//   day.addEventListener('click', refreshTemp);
// });
