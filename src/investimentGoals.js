function convertToMonthlyProfitRate(yearlyProfitRate) {
  return yearlyProfitRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0, // valor incial
  monthlyContribution = 0, // contribuiçao mensal
  timeProjection = 0, // projeção de quanto tempo irá manter
  timeProjectionPeriod = 'monthly', // projeção em meses ou anos?
  profitRate = 0, // taxa de retorno (lucro)
  profitRateTimePeriod = 'monthly'
) {
  if (!startingAmount || !timeProjection) {
    
    throw new Error(
      'Initial investment and time amount (prazo) need to be filled with positive values'
    );
  }
  const finalProfitRate =
    profitRateTimePeriod === 'monthly'
      ? profitRate / 100 + 1
      : convertToMonthlyProfitRate(profitRate / 100 + 1);

  const finaltimeProjectionPeriod =
    timeProjectionPeriod === 'monthly' ? timeProjection : timeProjection * 12;

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
    timeReference <= finaltimeProjectionPeriod;
    timeReference++
  ) {
    const investedAmount = startingAmount + timeReference * monthlyContribution;

    const monthInterestReturn =
      returnsArray[timeReference - 1].totalAmount * finalProfitRate;

    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalProfitRate +
      monthlyContribution;

    const totalInterestReturn = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount,
      monthInterestReturn,
      totalInterestReturn,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
