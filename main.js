import { generateReturnsArray } from './src/investimentGoals';

const form = document.getElementById('form');

let thereIsAError = false;

function renderProgression(event) {
  event.preventDefault();
  if (thereIsAError) {
    return;
  }
  const starting = Number(
    document.getElementById('starting-amount').value.replace(',', '.')
  );
  const contribution = Number(
    document.getElementById('monthly-contribution').value.replace(',', '.')
  );
  const projectin = Number(
    document.getElementById('time-projection').value.replace(',', '.')
  );
  const projectinPeriod = document.getElementById(
    'time-projection-period'
  ).value;
  const profitRate = Number(
    document.getElementById('profit-rate').value.replace(',', '.')
  );

  const profitRateTimePeriod = document.getElementById(
    'profit-rate-time-period'
  ).value;
  const taxRate = Number(
    document.getElementById('tax-rate').value.replace(',', '.')
  );

  const returnsArray = generateReturnsArray(
    starting,
    contribution,
    projectin,
    projectinPeriod,
    profitRate,
    profitRateTimePeriod
  );

  console.log(returnsArray);
}

function validateInput(event) {
  const inputValue = event.target.value.replace(',', '.');
  const parentElement = event.target.parentElement.parentElement;
  const paragraphError = parentElement.querySelector('p');
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
