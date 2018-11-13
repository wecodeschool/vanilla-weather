let selected = document.querySelector('.day__block--selected');

function showTemperature() {
  document.querySelector('.weather-temp').innerHTML = this.getAttribute('max');
  document.querySelector('.weather__icon--today').setAttribute("src", 'images/' + this.getAttribute('conditions') + '.png');

  selected.classList.remove('day__block--selected');
  selected = this;
  selected.classList.add('day__block--selected');
}

let days = document.querySelectorAll('.day__block');
days.forEach(function(element, index) {
  element.addEventListener('click', showTemperature);
});
