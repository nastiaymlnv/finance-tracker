import React from "react";

import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { labels } from "../../enums/labels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
};

export const CategoriesExpencesBarChart = ({ filteredDataArr }) => {

    const data = {
        labels,
        datasets: [
            {
                data: filteredDataArr,
                backgroundColor: 'rgba(25, 118, 210, 0.7)',
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    );
};

CategoriesExpencesBarChart.propTypes = {
    filteredDataArr: PropTypes.array
}