import { generateReturnsArray } from './src/investimentGoals';
import { Chart } from 'chart.js/auto';

const form = document.getElementById('form');
const buttonToClear = document.getElementById('clear-btn');
const moneyDistribution = document.getElementById('money-distribution');
const progression = document.getElementById('progression');
const resultP = document.getElementById('p-result');
const progressionP = document.getElementById('p-progression');
let doughnutChartReference = {};
let barChartReference = {};

let thereIsAError = false;

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(event) {
  event.preventDefault();
  resetCharts();
  if (thereIsAError) {
    return;
  }
  if (
    progressionP.classList.contains('hidden') &&
    resultP.classList.contains('hidden')
  ) {
    progressionP.classList.remove('hidden');
    resultP.classList.remove('hidden');
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

  const investimentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(moneyDistribution, {
    type: 'doughnut',
    data: {
      labels: ['Total Investiment', 'Profit', 'Tax'],
      datasets: [
        {
          label: 'R$',
          data: [
            formatCurrency(investimentObject.investedAmount),
            formatCurrency(
              investimentObject.totalInterestReturn * (1 - taxRate / 100)
            ),
            formatCurrency(
              investimentObject.totalInterestReturn * (taxRate / 100)
            ),
          ],
          backgroundColor: [
            'rgb(255, 205, 86)',
            'rgb(35, 206, 107)',
            'rgb(240, 93, 94)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  barChartReference = new Chart(progression, {
    type: 'bar',
    data: {
      labels: returnsArray.map((investimentObject) => investimentObject.month),
      datasets: [
        {
          label: 'total investiment',
          data: returnsArray.map((investimentObject) =>
            formatCurrency(investimentObject.investedAmount)
          ),
          backgroundColor: 'rgb(255, 205, 86)',
        },
        {
          label: 'profit',
          data: returnsArray.map((investimentObject) =>
            formatCurrency(investimentObject.monthInterestReturn)
          ),
          backgroundColor: 'rgb(35, 206, 107)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function isInvestimentObjectNotEmpty(objectChartReference) {
  return Object.keys(objectChartReference).length !== 0;
}

function resetCharts() {
  if (
    isInvestimentObjectNotEmpty(doughnutChartReference) &&
    isInvestimentObjectNotEmpty(barChartReference)
  ) {
    doughnutChartReference.destroy();
    barChartReference.destroy();
  }
}

function cleanInput() {
  form['starting-amount'].value = '';
  form['monthly-contribution'].value = '';
  form['time-projection'].value = '';
  form['profit-rate'].value = '';
  form['tax-rate'].value = '';
  resetCharts();
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
