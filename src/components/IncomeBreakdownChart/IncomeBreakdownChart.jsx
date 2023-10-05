import React from "react";

import PropTypes from 'prop-types';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { filterIncomeByAccount } from "../../helpers/filterIncomeByAccount";

ChartJS.register(ArcElement, Tooltip, Legend);

export const IncomeBreakdownChart = ({ incomeByPeriodArr}) => {
    const labels = new Set();
    const sumByCategory = [];
    const filteredByAccountArr = filterIncomeByAccount(incomeByPeriodArr);
    
    filteredByAccountArr.map(item => labels.add(item.category));

    const generalSum = filteredByAccountArr
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0);
    
    for (let category of labels) {
        sumByCategory.push(filteredByAccountArr.filter(item => item.category === category)
            .map(elem => elem.amount)
            .reduce((accum, curr) => accum += curr, 0));
    }

    const percentsArr = sumByCategory.map(item => ((item / generalSum) * 100).toFixed(1));

    const data = {
        labels: Array.from(labels),
        datasets: [
            {
                label: '%',
                data: percentsArr,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(76, 175, 80, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(76, 175, 80, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    return (
        <Pie data={data} />
    )
}

IncomeBreakdownChart.propTypes = {
    incomeByPeriodArr: PropTypes.array
}