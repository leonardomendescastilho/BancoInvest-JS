function convertToMonthlyProfitRate(yearlyProfitRate) {
  return yearlyProfitRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0, // valor incial
  monthlyContribution = 0, // contribuiçao mensal
  timeProjection = 0, // projeção de quanto tempo irá manter
  timePeriod = 'monthly', // projeção em meses ou anos?
  profitRate = 0, // taxa de retorno (lucro)
  profitRateTimePeriod = 'monthly'
) {
  if (!startingAmount || !timeProjection) {
    throw new Error(
      'Initial investiment and time amount(prazo), needs to be filled with positive values'
    );
  }

  // transformando o lucro/profitibility em decimal (1,04) baseado mensalmente
  const finalProfitRate =
    profitRateTimePeriod === 'monthly'
      ? profitRate / 100 + 1
      : convertToMonthlyProfitRate(profitRate / 100 + 1);

  // transformando o tempo de investimento/time amount em mensal
  const finalTimeHorizen =
    timePeriod === 'monthly' ? timeProjection : timeProjection * 12;

  // objeto inicial que simula o primeiro mês de investimento
  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    monthInterestReturn: 0,
    totalInterestReturn: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestimentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizen;
    timeReference++
  ) {
    const investedAmount = startingAmount + month * monthlyContribution;

    const monthInterestReturn =
      returnsArray[timeReference - 1].totalAmount * finalProfitRate;

    const totalInterestReturn = totalAmount - investedAmount;

    const month = timeReference;

    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalProfitRate +
      monthlyContribution;

    returnsArray.push({
      investedAmount,
      monthInterestReturn,
      totalInterestReturn,
      month,
      totalAmount,
    });
  }
}
