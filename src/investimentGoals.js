function convertToMonthlyProfitRate(yearlyProfitRate) {
  return yearlyProfitRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  monthlyContribution = 0,
  timeProjection = 0,
  timeProjectionPeriod = 'monthly',
  profitRate = 0,
  profitRateTimePeriod = 'monthly'
) {
  if (!startingAmount || !timeProjection) {
    throw new Error(
      'Initial investment and time amount need to be filled with positive values'
    );
  }

  const finaltimeProjectionPeriod =
    timeProjectionPeriod === 'monthly' ? timeProjection : timeProjection * 12;

  const finalProfitRate =
    profitRateTimePeriod === 'monthly'
      ? profitRate / 100 + 1
      : convertToMonthlyProfitRate(profitRate / 100 + 1);

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
