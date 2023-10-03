export const filterDataToDisplay = (categories, transactions, accountType, period) => {
    const timePeriodTransactions = filterDatesByCurrentPeriod(transactions, period);
    const filteredArr = [];

    if (accountType === "All") {
        for (let category of categories) {
            filteredArr.push(timePeriodTransactions
                .filter(item => item.type === "Expenses" && item.category === category)
                .map(elem => elem.amount)
                .reduce((accum, curr) => accum += curr, 0))
        }
    }
    else {
        for (let category of categories) {
            filteredArr.push(timePeriodTransactions
                .filter(item => item.type === "Expenses" && item.account === accountType && item.category === category)
                .map(elem => elem.amount)
                .reduce((accum, curr) => accum += curr, 0))
        }
    }

    return filteredArr;
}

export const filterDatesByCurrentPeriod = (data, period) => {
    const now = new Date();
    const past = new Date(now.getTime() - period * 24 * 60 * 60 * 1000);
    const start = past.getTime();
    const end = now.getTime();

    return data.filter(item => Date.parse(item.date) >= start && Date.parse(item.date) < end);
}