import React from "react";
import { useSelector } from "react-redux";

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

import { filterDatesByCurrentPeriod } from "../../helpers/filterData";

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

export const ExpensesTrendChart = ({ timePeriodNum }) => {
    const transactions = useSelector(state => state.operations);
    const expenseByPeriod = filterDatesByCurrentPeriod(transactions, timePeriodNum);
    const secondIndexToSlice = timePeriodNum !== 365 ? 10 : 7;
    const arrByDates = [];
    let datesArr = new Set();

    expenseByPeriod.map(item => item.type === "Expenses" && !datesArr.has(item.date.slice(0, secondIndexToSlice)) && datesArr.add(item.date.slice(0, 10)));
    datesArr = Array.from(datesArr);

    for (let i = 0; i < datesArr.length; i++) {
        arrByDates.push(expenseByPeriod
            .filter(item => item.type === "Expenses" && item.date.slice(0, secondIndexToSlice) === datesArr[i])
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
                label: 'General expense',
                data: arrByDates,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}

ExpensesTrendChart.propTypes = {
    timePeriodNum: PropTypes.number
}