import React, { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import {
    Box,
    Paper,
    Typography,
    Select,
    MenuItem
} from "@mui/material";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { timePeriods } from "../../enums/timePeriods";
import { labels } from "../../enums/labels";
import { filterDataToDisplay } from "../../helpers/filterData";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoriesExpencesPieChart = ({ title, account }) => {
    const transactions = useSelector(state => state.operations);
    const [timePeriod, setTimePeriod] = useState("last week");
    const [timePeriodNum, setTimePeriodNum] = useState(7);
    const sumByCategoriesArr = filterDataToDisplay(labels, transactions, account, timePeriodNum);
    const generalSum = transactions
        .filter(item => item.type === "Expenses")
        .map(elem => elem.amount)
        .reduce((accum, curr) => accum += curr, 0);

    const percentsArr = sumByCategoriesArr.map(item => ((item / generalSum) * 100).toFixed(1));

    const data = {
        labels: labels,
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

    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        setTimePeriod(selectedValue);
        if (selectedValue === "last week") setTimePeriodNum(7);
        else if (selectedValue === "last month") setTimePeriodNum(30);
        else if (selectedValue === "last year") setTimePeriodNum(365);
    }

    return (
        <Paper sx={{ p: "15px", mb: "10px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "15px" }}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Select
                    variant="standard"
                    value={timePeriod}
                    onChange={handleSelect}
                >
                    {timePeriods.map((period, index) => (
                        <MenuItem key={index} value={period}>
                            {period}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Pie data={data} />
        </Paper>
    )
}
CategoriesExpencesPieChart.propTypes = {
    title: PropTypes.string,
    account: PropTypes.string
}