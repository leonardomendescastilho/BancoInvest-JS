import { generateReturnsArray } from './src/investimentGoals';

const form = document.getElementById('form');
const buttonToClear = document.getElementById('clear-btn');

let thereIsAError = false;

function renderProgression(event) {
  event.preventDefault();
  if (thereIsAError) {
    return;
  }
  const starting = Number(form['starting-amount'].value.replace(',', '.'));
  const contribution = Number(
    form['monthly-contribution'].value.replace(',', '.')
  );
  const projecting = Number(form['time-projection'].value.replace(',', '.'));
  const projectingPeriod = form['time-projection-period'].value;
  const profitRate = Number(form['profit-rate'].value.replace(',', '.'));

  const profitRateTimePeriod = form['profit-rate-time-period'].value;

  const taxRate = Number(form['tax-rate'].value.replace(',', '.'));

  const returnsArray = generateReturnsArray(
    starting,
    contribution,
    projecting,
    projectingPeriod,
    profitRate,
    profitRateTimePeriod
  );

  console.log(returnsArray);
}

function cleanInput() {
  form['starting-amount'].value = '';
  form['monthly-contribution'].value = '';
  form['time-projection'].value = '';
  form['profit-rate'].value = '';
  form['tax-rate'].value = '';

  const elementsP = document.querySelectorAll('p');

  for (const paragraph of elementsP) {
    if (!paragraph.classList.contains('hidden')) {
      paragraph.classList.add('hidden');
      thereIsAError = false;
    }
  }
}

function validateInput(event) {
  const inputValue = event.target.value.replace(',', '.');
  const divElement = event.target.parentElement.parentElement;
  const paragraphError = divElement.querySelector('p');
  const paragraphContainsHidden = paragraphError.classList.contains('hidden');

  if (event.target.value === '') {
    return;
  }

  if (
    isNaN(inputValue) ||
    (Number(inputValue) <= 0 && paragraphContainsHidden)
  ) {
    paragraphError.classList.remove('hidden');
    thereIsAError = true;
  } else if (
    !paragraphContainsHidden &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    paragraphError.classList.add('hidden');
    thereIsAError = false;
  }
}
for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
    thereIsAError = false;
  }
}

form.addEventListener('submit', renderProgression);
buttonToClear.addEventListener('click', cleanInput);
