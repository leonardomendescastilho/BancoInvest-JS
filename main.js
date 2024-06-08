import { generateReturnsArray } from './src/investimentGoals';

const form = document.getElementById('form');

function renderProgression(event) {
  event.preventDefault();
  const starting = Number(document.getElementById('starting-amount').value);
  const contribution = Number(
    document.getElementById('monthly-contribution').value
  );
  const projectin = Number(document.getElementById('time-projection').value);
  const projectinPeriod = document.getElementById(
    'time-projection-period'
  ).value;
  const profitRate = Number(document.getElementById('profit-rate').value);

  const profitRateTimePeriod = document.getElementById(
    'profit-rate-time-period'
  ).value;
  const taxRate = Number(document.getElementById('tax-rate').value);

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

form.addEventListener('submit', renderProgression);
