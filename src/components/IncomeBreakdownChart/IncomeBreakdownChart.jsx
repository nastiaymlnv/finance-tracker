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
import { incomeCategories } from "../../pages/CreateOperation/categories";

ChartJS.register(ArcElement, Tooltip, Legend);

export const IncomeBreakdownChart = ({ account, incomeByPeriodArr}) => {
    const labels = incomeCategories;
    const sumByCategory = [];
    const filteredByAccountArr = filterIncomeByAccount(account, incomeByPeriodArr);

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
        labels,
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
    account: PropTypes.string,
    incomeByPeriodArr: PropTypes.array
}