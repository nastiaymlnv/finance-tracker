import React from "react";

import PropTypes from "prop-types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
};

export const TrendChart = ({ transactionType, timePeriodNum, timePeriodTransactions, account }) => {
    const secondIndexToSlice = timePeriodNum !== 365 ? 10 : 7;
    const periodExpensesSum = [];
    let datesArr = new Set();

    if (account === "All") {
        timePeriodTransactions.map(item => item.type === transactionType
            && datesArr.add(item.date.slice(0, secondIndexToSlice)));
    }
    else {
        timePeriodTransactions.map(item => item.type === transactionType
            && item.account === account
            && datesArr.add(item.date.slice(0, secondIndexToSlice)));
    }

    datesArr = Array.from(datesArr);

    for (let date of datesArr) {
        periodExpensesSum.push(timePeriodTransactions
            .filter(item => item.type === transactionType && item.date.slice(0, secondIndexToSlice) === date)
            .map(elem => elem.amount)
            .reduce((accum, curr) => accum += curr, 0)
        )
    }

    const labels = datesArr;

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: transactionType === "Income" ? 'General income' : 'General expense',
                data: periodExpensesSum,
                borderColor: transactionType === "Income" ? 'rgb(76, 175, 80)' : 'rgb(255, 99, 132)',
                backgroundColor: transactionType === "Income" ? 'rgba(76, 175, 80, 0.5)' : 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}

TrendChart.propTypes = {
    transactionType: PropTypes.string,
    timePeriodNum: PropTypes.number,
    timePeriodTransactions: PropTypes.array,
    account: PropTypes.string
}