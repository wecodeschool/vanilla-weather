let selected  = document.querySelector('.day__block--selected');
let days      = document.querySelectorAll('.day__block');
let todayTemp = document.querySelector('.weather-temp--today');
let todayIcon = document.querySelector('.weather__icon--today');

function refreshTemp() {
  todayTemp.innerHTML = this.getAttribute('max');
  document.querySelector('.day__block--selected').classList.remove('day__block--selected');
  this.classList.add('day__block--selected');

  let iconPath = 'images/' + this.getAttribute('conditions') + '.png'
  todayIcon.setAttribute('src', iconPath);
};

days.forEach(function(day, index) {
  day.addEventListener('click', refreshTemp);
});
