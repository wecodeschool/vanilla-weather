let selected  = document.querySelector('.day__block--selected');
let days      = document.querySelectorAll('.day__block');
let todayTemp = document.querySelector('.weather-temp--today');
let todayIcon = document.querySelector('.weather__icon--today');

function refreshTemp(event) {
  todayTemp.innerHTML = event.currentTarget.getAttribute('max');
  document.querySelector('.day__block--selected').classList.remove('day__block--selected');
  event.currentTarget.classList.add('day__block--selected');

  let iconPath = 'images/' + event.currentTarget.getAttribute('conditions') + '.png'
  todayIcon.setAttribute('src', iconPath);
};

days.forEach(function(day, index) {
  day.addEventListener('click', refreshTemp);
});
