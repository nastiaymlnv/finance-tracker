import React from "react";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { labels } from "../../enums/labels";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoriesExpensesPieChart = ({ filteredDataArr }) => {
    const transactions = useSelector(state => state.operations);
    const generalSum = transactions
        .filter(item => item.type === "Expenses")
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0);

    const percentsArr = filteredDataArr && filteredDataArr.map(item => ((item / generalSum) * 100).toFixed(1));

    const data = {
        labels,
        datasets: [
            {
                label: '%',
                data: percentsArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(237, 108, 2, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(76, 175, 80, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(186, 104, 200, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(237, 108, 2, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(186, 104, 200, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data} />
    )
}
CategoriesExpensesPieChart.propTypes = {
    filteredDataArr: PropTypes.array
}